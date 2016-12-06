#!/bin/bash

set -e # exit immediately on error

source 'functions.sh'

./test.sh

build-js-for-distribution() {
  local dir="$1"

  echo "Building JS for ${dir}..."

  mkdir -p "${dir}/dist"
  cat \
    lib/poppins.js \
    lib/injector.js \
    $(unique-source-files "$dir") \
    "${dir}/main.js" \
    > "${dir}/dist/all.js"

  echo "Finished building $dir"
}

build-js-for-distribution peripherals
build-js-for-distribution motherboard
