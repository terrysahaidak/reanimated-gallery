<p align="center">
  <h1 align="center">React Native Gallery Toolkit</h1>
  <h3 align="center"> Reanimated 2 and Gesturer Handler powered Gallery implementation</h3>
</p>

<p align="center">
  <img width="200" height="400" src="gifs/promo.gif" alt="Gallery in action gif">
  <img width="200" height="400" src="gifs/promo_2.gif" alt="Instagram feed clone">
</p>

[![npm](https://img.shields.io/npm/v/react-native-gallery-toolkit.svg?style=plastic)](https://npmjs.com/package/react-native-gallery-toolkit)

- [Installation](#installation)
- [Standalone gallery](#standalone-gallery)
  - [Limitations](#limitations)
  - [Base props](#base-props)
  - [Advance props](#advance-props)
  - [Handlers](#handlers)
  - [Methods](#methods)
- [Pager](#pager)
- [Transformer](#transformer)
- [Scalable Image](#scalable-image)
- [Examples](#examples)
  - [Running on iOS](#running-on-ios)
  - [Running on Android](#running-on-android)
- [TODOs](#todos)
- [LICENSE](#license)

**Important!**

The library uses Reanimated 2 alpha. It means that it may be unstable.
Also, the library itself is in the alpha testing stage and may contain bugs.

## Installation

Use npm or yarn to install the library

```bash
npm i --save react-native-gallery-toolkit
```

> Also, you need to install [react-native-reanimated@2.0.0-alpha.7](https://github.com/software-mansion/react-native-reanimated) (the new 2 version) and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler), and follow their installation instructions.

Expo is supported since SDK 40. 

```bash
npm install react-native-reanimated@2.0.0-rc.0
```

> More information is available [https://docs.expo.io/versions/latest/sdk/reanimated/](here)


## Standalone gallery

Standalone gallery renders Pager which supports thousands of images thanks to virtualization. Each page renders ImageTransformer component which gives ability to pinch-to-zoom, double tap to zoom, also you can run custom callbacks and worklets on on tab, double tap, pan.

```tsx
import {
  StandaloneGallery,
  GalleryItemType,
  StandaloneGalleryHandler,
} from 'react-native-gallery-toolkit';

const images: GalleryItemType[] = [
  {
    id: '1',
    width: 300,
    height: 300,
    uri: 'https://placekitten.com/300/300',
  },
  {
    id: '2',
    width: 400,
    height: 200,
    uri: 'https://placekitten.com/400/200',
  },
];

export default function App() {
  return <StandaloneGallery items={images} />;
}

```

See [Full featured example](./Example/src/Standalone/FullFeatured.tsx) for example of usage of all the props.

### Limitations

- Only portrait orientation currently supported
- There is no way to change dimensions without full re-render of the gallery
- Debugging is not supported because of Reanimated v2 uses TurboModules. Use flipper to debug your JS Context.
- On Android tap on hold on the screen while page changes doesn't trigger animation to stop due to bug in Gesture Handler.

### Base props

Prop | Description | Type | Default
------ | ------ | -------- | ------
`items` | The array of items to render. But can also accept Map, Set, or Object with keys. If the type is not array, then `getTotalCount` and `getItem` should be defined too. | `Array<{ width: number, height: number, id: string, uri: string  }>` | `undefined`
`width?` | Viewport width | `number` | `Dimensions.get('window').width`
`height?` | Viewport height | `number` | `Dimensions.get('window').height`
`numToRender?` | How many pages should be rendered at the same time | `number` | 2
`gutterWidth?` | The width of the gutter between pages | `number` | 0
`initialIndex?` | The initial page index | `number` | 0
`keyExtractor?` | Callback which extract the key of the page. Receives current item of the provided `items` as well as current index | `(item: T, index: number) => string` | Uses index as a key by default

### Advance props

Prop | Description | Type | Default
------ | ------ | ------ | ------
`getTotalCount?` | If the type of `items` is not an array, then this method should be defined to provide the total count of items | `(data: T) => number` | Required when `items` is not an array
`getItem?` | If the type of `items` is not an array, then this method should be defined to provide the current item based on the index. Can return either the `item` or `undefined`. | `(data: T, index: number) => ItemT or undefined` | Required when `items` is not an array
`renderImage?` | Callback that can be used to render custom image component. As an example, it can be used to render custom loading/error states | `(props: RenderImageProps, item: ItemT, index: number) => JSX.Element` | `() => Image`
`renderPage?` | Callback that can be used to render custom page. Can be used to display some non-image pages such as Video, for instance | `(props: ImageRendererProps<T>, index: number) => JSX.Element` | `ImageTransformer`

### Handlers

Prop | Description | Type | Is worklet? | Default
------ | ------ | ------ | ------ | ------
`onIndexChange?` | Fires when active index changes | `(nextIndex: number) => void`  | `Function` or `Worklet` | `undefined`
`onTap?` | Executes when tap image transformer receives tap | `() => void` | `Function` or `Worklet` | `undefined`
`onDoubleTap?` | Executes when tap image transformer receives double-tap  | `() => void` | `Function` or `Worklet` | `undefined`
`onInteraction?` | Is called when either pan or scale has happened. | `(type: 'scale' or 'pan') => void` | `Function` or `Worklet` | `undefined`
`onPagerTranslateChange?` | Executes on pager's horizontal pan | `(translateX: number) => void` | `Function` or `Worklet` | `undefined`
`onGesture?` | Executes on pager's gesture | `(event: PanGestureHandlerGestureEvent, isActive: SharedValue<boolean>) => void` | `Function` or `Worklet` | `undefined`
`shouldPagerHandleGestureEvent?` | Worklet that will be passed to pager's `shouldHandleEvent` to determine should pager handle this event. Can be used to handle "swipe down to close".  | `(event: PanGestureHandlerGestureEvent) => boolean` | Only `Worklet` | `undefined`

### Methods

Name | Description | Type
------ | ------ | ------
`goNext` | Changes the active index forward | `() => void`
`goBack` | Changes the active index backward | `() => void`
`setIndex` | Sets the active index | `(nextIndex: number) => void`

## Pager

TODO

## Transformer

TODO

## Scalable Image

TODO

## Examples

The source code for the example (showcase) app is under the [`Example/`](https://github.com/terrysahaidak/react-native-gallery-toolkit/blob/master/Example/) directory.
Clone the repo, go to the Example/ folder and run:

```bash
npm install
```

### Running on iOS

Before running the app, install the cocoapods dependencies:

```bash
npx pod-install
```

Now, you can start the app:

```bash
npm run ios
```

### Running on Android

```bash
npm run android
```

## TODOs

- [ ] Add invariants to all the required props
- [ ] Finish documentation
- [ ] Lightbox with examples
- [ ] Lightbox Gallery with examples
- [ ] Try to use react-native-shared-element

## LICENSE

[MIT](LICENSE)
