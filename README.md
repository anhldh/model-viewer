# @anhldh/model-viewer

A fork of [`@google/model-viewer`](https://modelviewer.dev/) that keeps the `<model-viewer>` web component and adds two capabilities:

- **`KHR_animation_pointer` support** — animate material, camera, light and other glTF properties through the animation pointer extension, beyond plain node transforms.
- **LOD (Level of Detail) loading** — progressively load lighter geometry and textures first, then swap in higher detail, powered by [`@anhldh/gltf-lod-loader`](https://www.npmjs.com/package/@anhldh/gltf-lod-loader).

Only the `<model-viewer>` component is forked from upstream — the other `@google/model-viewer` packages are not included. Anything not described here behaves exactly as documented at [modelviewer.dev](https://modelviewer.dev/).

## Installation

```bash
# npm
npm install three @anhldh/model-viewer

# yarn
yarn add three @anhldh/model-viewer

# pnpm
pnpm add three @anhldh/model-viewer

# bun
bun add three @anhldh/model-viewer
```

`three` is a peer dependency (`>=0.170.0 <0.185.0`). This fork is tested against a specific three.js range — keep your three.js version within it to avoid upstream breaking changes.

## Usage

Import once to register the custom element, then use `<model-viewer>` in your markup:

```js
import "@anhldh/model-viewer";
```

```html
<model-viewer
  src="https://yourdomain.com/model.glb"
  camera-controls
  autoplay
></model-viewer>
```

### `KHR_animation_pointer`

Models exported with the `KHR_animation_pointer` extension animate automatically — material colors, opacity, camera and light parameters, and other pointer-targeted properties are driven by the model's animation tracks. Use the standard playback API as usual:

```js
const viewer = document.querySelector("model-viewer");
viewer.animationName = "MyAnimation";
viewer.play();
```

### LOD loading

LOD-enabled models load progressively: a low-detail version appears first, then higher-detail meshes and textures stream in. This works with models prepared for `@anhldh/gltf-lod-loader`.

> **TODO:** document how LOD is toggled — automatic on load, or via an attribute such as `lod` / a JS property. Fill in once finalized.

## Versioning

This is a fork and is versioned independently of upstream `@google/model-viewer`. Breaking changes follow semver on this package, not on the original.

## License

Apache-2.0, inherited from [`@google/model-viewer`](https://github.com/google/model-viewer).
