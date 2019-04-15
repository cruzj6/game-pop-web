#!/usr/bin/env bash

# Build the wasm file(s)
pushd rust
wasm-pack build
popd

# Link the js files using yarn
pushd rust/pkg
yarn link
popd

# Finally link it for js files
yarn link game-pop-data-transforms