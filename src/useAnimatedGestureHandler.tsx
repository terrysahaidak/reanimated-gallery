import { useRef } from 'react';
import { Platform } from 'react-native';
import Animated, {
  makeRemote,
  useEvent,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  GestureHandlerGestureEvent,
  GestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

function useRemoteContext<T extends object>(initialValue: T) {
  const initRef = useRef<{ context: T } | null>(null);
  if (initRef.current === null) {
    initRef.current = {
      context: makeRemote(initialValue ?? {}),
    };
  }
  const { context } = initRef.current;

  return context;
}

export function useDiff(sharedValue: Animated.SharedValue<any>) {
  const context = useRemoteContext({
    stash: 0,
    prev: null,
  });

  return useDerivedValue(() => {
    context.stash =
      context.prev !== null
        ? sharedValue.value - (context.prev ?? 0)
        : 0;
    context.prev = sharedValue.value;

    return context.stash;
  });
}

export function diff(context: any, name: string, value: any) {
  'worklet';

  if (!context.___diffs) {
    context.___diffs = {};
  }

  if (!context.___diffs[name]) {
    context.___diffs[name] = {
      stash: 0,
      prev: null,
    };
  }

  const d = context.___diffs[name];

  d.stash = d.prev !== null ? value - d.prev : 0;
  d.prev = value;

  return d.stash;
}

type Context = { [key: string]: any };
type Handler<T, TContext extends Context> = (
  event: T,
  context: TContext,
) => void;
type ReturnHandler<T, TContext extends Context, R> = (
  event: T,
  context: TContext,
) => R;

interface GestureHandlers<T, TContext extends Context> {
  onInit?: Handler<T, TContext>;
  onEvent?: Handler<T, TContext>;
  shouldHandleEvent?: ReturnHandler<T, TContext, boolean>;
  onGesture?: Handler<T, TContext>;
  beforeEach?: Handler<T, TContext>;
  afterEach?: Handler<T, TContext>;
  onStart?: Handler<T, TContext>;
  onActive?: Handler<T, TContext>;
  onEnd?: Handler<T, TContext>;
  onFail?: Handler<T, TContext>;
  onCancel?: Handler<T, TContext>;
  onFinish?: (
    event: T,
    context: TContext,
    isCanceledOrFailed: boolean,
  ) => void;
}

type OnGestureEvent<T> = (event: T) => void;

export function useAnimatedGestureHandler<
  T extends GestureHandlerGestureEvent,
  TContext extends Context
>(
  handlers: GestureHandlers<T['nativeEvent'], TContext>,
): OnGestureEvent<T> {
  const context = useRemoteContext<any>({
    __initialized: false,
  });
  const isAndroid = Platform.OS === 'android';

  return useEvent(
    (
      event: T['nativeEvent'] &
        GestureHandlerStateChangeEvent['nativeEvent'],
    ) => {
      'worklet';

      // const UNDETERMINED = 0;
      const FAILED = 1;
      const BEGAN = 2;
      const CANCELLED = 3;
      const ACTIVE = 4;
      const END = 5;

      if (handlers.onInit && !context.__initialized) {
        context.__initialized = true;
        handlers.onInit(event, context);
      }

      if (handlers.onGesture) {
        handlers.onGesture(event, context);
      }

      const stateDiff = diff(context, 'pinchState', event.state);

      const pinchBeganAndroid =
        stateDiff === ACTIVE - BEGAN ? event.state === ACTIVE : false;

      const isBegan = isAndroid
        ? pinchBeganAndroid
        : event.state === BEGAN;

      if (isBegan) {
        if (handlers.shouldHandleEvent) {
          context._shouldSkip = !handlers.shouldHandleEvent(
            event,
            context,
          );
        } else {
          context._shouldSkip = false;
        }
      } else if (typeof context._shouldSkip === 'undefined') {
        return;
      }

      if (!context._shouldSkip) {
        if (handlers.onEvent) {
          handlers.onEvent(event, context);
        }

        if (handlers.beforeEach) {
          handlers.beforeEach(event, context);
        }

        if (isBegan && handlers.onStart) {
          handlers.onStart(event, context);
        }

        if (event.state === ACTIVE && handlers.onActive) {
          handlers.onActive(event, context);
        }
        if (
          event.oldState === ACTIVE &&
          event.state === END &&
          handlers.onEnd
        ) {
          handlers.onEnd(event, context);
        }
        if (
          event.oldState === ACTIVE &&
          event.state === FAILED &&
          handlers.onFail
        ) {
          handlers.onFail(event, context);
        }
        if (
          event.oldState === ACTIVE &&
          event.state === CANCELLED &&
          handlers.onCancel
        ) {
          handlers.onCancel(event, context);
        }

        if (event.oldState === ACTIVE) {
          if (handlers.onFinish) {
            handlers.onFinish(
              event,
              context,
              event.state === CANCELLED || event.state === FAILED,
            );
          }
        }

        if (handlers.afterEach) {
          handlers.afterEach(event, context);
        }
      }

      if (event.oldState === ACTIVE) {
        context._shouldSkip = undefined;
      }
    },
    ['onGestureHandlerStateChange', 'onGestureHandlerEvent'],
  );
}
