#!/bin/bash -e

which jasmine || npm install --global jasmine

mkdir -p motherboard/dist
mkdir -p peripherals/dist

for module in motherboard peripherals; do
  mkdir -p "${module}/.build-tmp"

  cat \
    poppins.js \
    injector.js \
    $(find "shared/src" -name '*.js') \
    $(find "${module}/src" -name '*.js') \
  > "${module}/dist/all.js"

  cat \
    "${module}/dist/all.js" \
    $(find "${module}/test" -name 'test-*.js') \
  > "${module}/.build-tmp/test.js"

  jasmine "${module}/.build-tmp/test.js"
done
