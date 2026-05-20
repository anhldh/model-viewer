/* @license
 * Copyright 2026 anhldh. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Type-only augmentation for React/JSX.
 *
 * Usage (in a React + TypeScript project):
 *
 *   import '@anhldh/model-viewer';        // registers <model-viewer>
 *   import '@anhldh/model-viewer/react';  // adds JSX type
 *
 * This file emits no runtime code.
 */

import type { DetailedHTMLProps, HTMLAttributes } from "react";

import type { ModelViewerElement } from "./model-viewer.js";

type ModelViewerProps = DetailedHTMLProps<
  HTMLAttributes<ModelViewerElement>,
  ModelViewerElement
> & {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: "eager" | "lazy" | "auto";
  reveal?: "auto" | "interaction" | "manual";
  ar?: boolean;
  "ar-modes"?: string;
  "ar-scale"?: "auto" | "fixed";
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "auto-rotate-delay"?: string;
  "shadow-intensity"?: string;
  "environment-image"?: string;
  "animation-name"?: string;
  autoplay?: boolean;
  "camera-orbit"?: string;
  "field-of-view"?: string;
};

// React 18: JSX is a global namespace.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

// React 19: JSX namespace lives inside the "react" module.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

export {};
