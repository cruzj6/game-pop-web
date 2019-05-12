#!/usr/bin/env bash

echo "Building wasm files"
# Build the wasm file(s)
pushd rust
wasm-pack build
popd

echo "Creating yarn link for game-pop-data-transforms"
# Link the js files using yarn
pushd rust/pkg
yarn link
popd

echo "Linking game-pop-data-transforms"
# Finally link it for js files
yarn link game-pop-data-transforms