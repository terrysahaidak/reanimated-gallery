---
id: pager
title: Pager
slug: /apis/pager
---

`Pager`

> TODO: add preview here

## Usage

```tsx
import React from 'react';
import { Dimensions, Image } from 'react-native';
import {
  GalleryItemType,
  normalizeDimensions,
  Pager,
} from 'react-native-gallery-toolkit';

const { height, width } = Dimensions.get('window');

const pages: GalleryItemType[] = [
  {
    id: '1',
    width: 400,
    height: 300,
    uri: 'https://placekitten.com/400/300',
  },
  {
    id: '2',
    width: 400,
    height: 300,
    uri: 'https://placekitten.com/400/300',
  },
  {
    id: '3',
    width: 400,
    height: 300,
    uri: 'https://placekitten.com/400/300',
  },
];

export default function PagerBasicExampleScreen() {
  return (
    <Pager
      pages={pages}
      totalCount={pages.length}
      keyExtractor={(item) => item.id}
      initialIndex={0}
      gutterWidth={20}
      renderPage={(props) => {
        const { targetWidth, targetHeight } = normalizeDimensions(
          props.item,
        );

        return (
          <Image
            style={{ width: targetWidth, height: targetHeight }}
            source={{ uri: props.item.uri }}
          />
        );
      }}
    />
  );
}
```

## Props

### `initialIndex`

Initial page index.

type | default | required
------ | ------ | ------
`number` | `undefined` | YES

### `initialDiffValue`

renders initially only a visible page. If the value is 1 and the index is 0 - renders only 2 pages, but if the index, for example, 1 - renders the first, second (active), and the third page.

Can be used to avoid some flickering on some high-end devices.

type | default | required
------ | ------ | ------
`number` | `0` | YES

### `totalCount`

Total pages count.

type | default | required
------ | ------ | ------
`number` | `undefined` | YES

### `pages`

The array of items to render. But can also accept `Map`, `Set`, or `Object` with keys. If the type is not an array, then `getItem` should be defined too.

Each element of the collection will be passed to the `renderPage` callback.

type | default | required
------ | ------ | ------
`Array<GalleryItemType>` | `undefined` | YES

### `width`

Pager width, usually it will be the window width.

type | default | required
------ | ------ | ------
`number` | `Dimensions.get('window').width` | NO

### `gutterWidth`

Page gutter width.

type | default | required
------ | ------ | ------
`number` | `Dimensions.get('window').width / 14` | NO

### `numToRender`

Number of pages to be rendered at the same time.

type | default | required
------ | ------ | ------
`number` | `2` | NO

### `shouldRenderGutter`

Should page gutter be render.

type | default | required
------ | ------ | ------
`boolean` | `undefined` | NO

### `verticallyEnabled`

Enable vertical gesture interaction.

type | default | required
------ | ------ | ------
`boolean` | `true` | NO

### `outerGestureHandlerRefs`

Array of gesture handler references that should work simultaneously with inner gesture handler.

type | default | required
------ | ------ | ------
`Array<React.Ref<GestureHandler>>` | `[]` | NO

### `springConfig`

Animation spring configs.

type | default | required
------ | ------ | ------
`Reanimated.WithSpringConfig` | [default config](./src/Pager.tsx#L307) | NO

### `pagerWrapperStyles`

Pager wrapper style.

type | default | required
------ | ------ | ------
`ViewStyle` | `undefined` | NO

### `renderPage`

Callback method to handle page rendering.

type | default | required
------ | ------ | ------
`(props: RenderPageProps, index: number) => JSX.Element` | `undefined` | NO

### `getItem`

Callback method to get item for a given item at the specified index.

type | default | required
------ | ------ | ------
`(data: GalleryItemType[], index: number) => GalleryItemType` | `undefined` | NO

### `keyExtractor`

Callback method to extract a unique key for a given item at the specified index.

type | default | required
------ | ------ | ------
`(item: GalleryItemType, index: number) => string` | `undefined` | YES

### `shouldHandleGestureEvent`

Callback method to decide whether gesture should be handled or ignored, this could be a **Worklet or Function**.

Useful when we need to disable the pager's pan gesture handler on some interaction.

type | default | required
------ | ------ | ------
`(event: PanGestureHandlerGestureEvent.nativeEvent) => boolean` | `undefined` | NO


## Handlers

### `onIndexChange`

Fires when active index changes, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(nextIndex: number) => void` | `undefined`  | NO

### `onPagerTranslateChange`

Fires when page `translateX` changes, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(translateX: number) => void` | `undefined`  | NO

### `onGesture`

Executes on pager's gesture, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(event: PanGestureHandlerGestureEvent, isActive: SharedValue<boolean>) => void` | `undefined`  | NO
