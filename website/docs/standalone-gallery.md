---
id: standalone-gallery
title: Standalone Gallery
slug: /apis/standalone-gallery
---

`Standalone Gallery` renders Pager which supports thousands of images thanks to virtualization. Each page renders `ImageTransformer` component which gives ability to pinch-to-zoom, double tap to zoom, also you can run custom callbacks and worklets on on tab, double tap, pan.

> TODO: add preview here

## Usage

```tsx
import React from 'react';
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

## Base Props

### `items`

The array of items to render. But can also accept `Map`, `Set`, or `Object` with keys. If the type is not array, then `getTotalCount` and `getItem` should be defined too.

type | default | required
------ | ------ | ------
`Array<GalleryItemType>` | `undefined` | Yes

### `width`

Viewport width, usually it will be the window width.

type | default | required
------ | ------ | ------
`number` | `Dimensions.get('window').width` | NO

### `height`

Viewport height, usually it will be the window height.

type | default | required
------ | ------ | ------
`number` | `Dimensions.get('window').height` | NO

### `numToRender`

How many pages should be rendered at the same time.

type | default | required
------ | ------ | ------
`number` | `2` | NO

### `gutterWidth`

The width of the gutter between pages.

type | default | required
------ | ------ | ------
`number` | `0` | NO

### `initialIndex`

The initial page index.

type | default | required
------ | ------ | ------
`number` | `0` | NO

### `keyExtractor`

Callback which extract the key of the page. Receives current item of the provided items as well as current index.

type | default | required
------ | ------ | ------
`(item: T, index: number) => string` | Uses index as a key by default | NO

## Advance Props

### `getTotalCount`

If the type of `items` is not an array, then this method should be defined to provide the total count of items

type | default | required
------ | ------ | ------
`(data: T) => number` | `undefined` |  Required when items is not an array

### `getItem`

If the type of `items` is not an array, then this method should be defined to provide the current item based on the index. Can return either the `item` or `undefined`.

type | default | required
------ | ------ | ------
`(data: T, index: number) => ItemT or undefined` | `undefined` | Required when items is not an array

### `renderImage`

Callback that can be used to render custom image component. As an example, it can be used to render custom loading/error states or if you want to use custom Image component (`FastImage`, for example).

By default it uses Image component provided by React Native.

type | default | required
------ | ------ | ------
`(props: RenderImageProps, item: ItemT, index: number) => JSX.Element` | `undefined` | NO

### `renderPage`

Callback that can be used to render custom page. Can be used to display some non-image pages such as Video, for instance.

type | default | required
------ | ------ | ------
`(props: ImageRendererProps<T>, index: number) => JSX.Element` | `StandaloneGallery.ImageRenderer` | NO

## Handlers

### `onIndexChange`

Fires when active index changes, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(nextIndex: number) => void` | `undefined`  | NO

### `onTap`

Executes when tap image transformer receives tap, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`() => void` | `undefined`  | NO

### `onDoubleTap`

Executes when tap image transformer receives double-tap, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`() => void` | `undefined`  | NO

### `onInteraction`

Is called when either pan or scale has happened, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(type: 'scale' or 'pan') => void` | `undefined`  | NO

### `onPagerTranslateChange`

Executes on pager's horizontal pan, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(translateX: number) => void` | `undefined`  | NO

### `onGesture`

Executes on pager's gesture, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(event: PanGestureHandlerGestureEvent, isActive: SharedValue<boolean>) => void` | `undefined`  | NO

### `shouldPagerHandleGestureEvent`

Worklet that will be passed to pager's `shouldHandleEvent` to determine should pager handle this event. Can be used to handle "swipe down to close", this could be **only Worklet**.

type | default | required
------ | ------ | ------
`(event: PanGestureHandlerGestureEvent) => boolean` | `undefined`  | NO

## Methods

### `goNext`

```tsx
goNext()
```

Changes the active index forward.

### `goBack`

```tsx
goBack()
```

Changes the active index backward.

### `setIndex`

```tsx
setIndex(nextIndex)
```

Sets the active index.

#### Parameters

name | type | required
------ | ------ | ------
nextIndex | `number` | Yes
