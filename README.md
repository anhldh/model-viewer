# @anhldh/model-viewer

A fork of [`@google/model-viewer`](https://modelviewer.dev/) that keeps the `<model-viewer>` web component and adds two capabilities on top:

- **`KHR_animation_pointer` support** — animate material, camera, light and other glTF properties through the animation pointer extension, beyond plain node transforms.
- **LOD (Level of Detail) loading** — progressively load lighter geometry and textures first, then swap in higher detail, powered by [`@anhldh/gltf-lod-loader`](https://www.npmjs.com/package/@anhldh/gltf-lod-loader).

Only the `<model-viewer>` component is forked from upstream — the other `@google/model-viewer` packages are not included. Anything not described here behaves exactly as documented at [modelviewer.dev](https://modelviewer.dev/).

## Installation

```bash
npm install three @anhldh/model-viewer
# or yarn add / pnpm add / bun add
```

`three` is a peer dependency. The supported range is `>=0.160.0 <0.185.0`. Three.js does not follow semver between minors, so keep your three.js version within this range to avoid runtime surprises.

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

If a model does not use the extension, animation behaves exactly like upstream `@google/model-viewer` — there is nothing to opt into.

### LOD loading

LOD activates automatically when the loaded glb declares the progressive-LOD extension recognized by `@anhldh/gltf-lod-loader`. There is no attribute or property to toggle — drop a LOD-enabled model into `src` and a low-detail version appears first, with higher-detail meshes and textures streaming in afterward. Files without the extension load normally with no overhead.

## React + TypeScript

The package ships an optional types subpath that augments JSX so `<model-viewer>` and its attributes are typed:

```tsx
import "@anhldh/model-viewer";        // registers the custom element (runtime)
import "@anhldh/model-viewer/react";  // adds JSX types (type-only)

export default function Viewer() {
  return (
    <model-viewer
      src="/model.glb"
      camera-controls
      auto-rotate
    />
  );
}
```

The `/react` subpath is **type-only** — importing it alone will not register the custom element. Keep both imports.

The augmentation is written to work with both React 18 (global `JSX` namespace) and React 19 (`JSX` inside the `react` module). `react` and `@types/react` are declared as optional peer dependencies; you only need them if you actually use the subpath.

## SSR (Next.js, Remix, etc.)

`<model-viewer>` calls `customElements.define` and touches `document` at module load. On a server it will throw. Import the runtime entry only on the client.

**Next.js App Router** — make the component a client component:

```tsx
"use client";

import "@anhldh/model-viewer";
import "@anhldh/model-viewer/react";

export default function Viewer() {
  return <model-viewer src="/model.glb" camera-controls />;
}
```

**Next.js Pages Router or any framework that needs a dynamic import** — load the module client-side only:

```tsx
import dynamic from "next/dynamic";

const Viewer = dynamic(
  async () => {
    await import("@anhldh/model-viewer");
    return function Viewer() {
      return <model-viewer src="/model.glb" camera-controls />;
    };
  },
  { ssr: false }
);
```

The `/react` subpath has no runtime code, so it is safe to import unconditionally at the top of any file alongside other type imports.

## Versioning

This is a fork and is versioned independently of upstream `@google/model-viewer`. Breaking changes follow semver on this package, not on the original.

## License

Apache-2.0, inherited from [`@google/model-viewer`](https://github.com/google/model-viewer).
