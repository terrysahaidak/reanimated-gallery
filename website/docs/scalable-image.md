---
id: scalable-image
title: Scalable Image
slug: /apis/scalable-image
---

`Scalable Image`

> TODO: add preview here

## Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import {
  ScalableImage,
  GalleryItemType
} from 'react-native-gallery-toolkit';

const image: GalleryItemType = {
  id: '4',
  width: 250,
  height: 250,
  uri: 'https://placekitten.com/250/250',
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ScalableImage
        width={image.width}
        height={image.height}
        source={image.uri}
      />
    </View>
  );
}
```

## Props

### `source`

Image source, this could be a local or remote image.

type | default | required
------ | ------ | ------
`ImageRequireSource` or `string` | `undefined` | YES

### `width`

Image width.

type | default | required
------ | ------ | ------
`number` | `undefined` | YES

### `height`

Image height.

type | default | required
------ | ------ | ------
`number` | `undefined` | YES

### `canvasDimensions`

The size of the canvas image should be rendered in. Usually, it will be the window dimensions.

type | default | required
------ | ------ | ------
`{ width?: number; height?: number; }` | `Dimensions.get('window')` | NO

### `enabled`

Enable gesture interaction.

type | default | required
------ | ------ | ------
`boolean` | `true` | NO

### `timingConfig`

Animation `duration` and `easing` configs.

type | default | required
------ | ------ | ------
`{ duration: number, easing: Easing }` | `{ duration: 250, easing: Easing.bezier(0.33, 0.01, 0, 1) }` | NO

### `outerGestureHandlerRefs`

Array of gesture handler references that should work simultaneously with inner gesture handler.

type | default | required
------ | ------ | ------
`Array<React.Ref<GestureHandler>>` | `[]` | NO

### `outerGestureHandlerActive`

A Reanimated shared value to indicate outer gesture is in active state. Can be used to disable gesture handlers.

type | default | required
------ | ------ | ------
`SharedValue<boolean>` | `undefined` | NO

### `style`

View style that will be applied to the image container.

type | default | required
------ | ------ | ------
`ViewStyle` | `undefined` | NO

### `MAX_SCALE`

Maximum scale value.

type | default | required
------ | ------ | ------
`number` | `3` | NO

### `MIN_SCALE`

Minimum scale value.

type | default | required
------ | ------ | ------
`number` | `1` | NO

### `renderImage`

Callback method to handle image rendering.

type | default | required
------ | ------ | ------
`(props: RenderScalableImageProps) => JSX.Element` | `undefined` | NO

## Handlers

### `onStateChange`

Fires when internal gesture become active, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(isActive: boolean) => void` | `undefined` | NO

### `onScale`

Fires when image scale changes, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`(scale: number) => void` | `undefined` | NO

### `onGestureStart`

Fires when internal gesture starts, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`() => void` | `undefined` | NO

### `onGestureRelease`

Fires when internal gesture releases, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`() => void` | `undefined` | NO

### `onEnd`

Fires when animation ends, this could be a **Worklet or Function**.

type | default | required
------ | ------ | ------
`() => void` | `undefined` | NO
