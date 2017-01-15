#!/bin/bash -e

which jasmine || npm install --global jasmine
mkdir -p .build-tmp
mkdir -p motherboard/dist
mkdir -p peripherals/dist

cat \
  poppins.js \
  injector.js \
  $(find motherboard/src -name '*.js') \
> motherboard/dist/all.js

cat \
  poppins.js \
  injector.js \
  $(find peripherals/src -name '*.js') \
> peripherals/dist/all.js

cat \
  peripherals/dist/all.js \
  $(find peripherals/test -name 'test-*.js') \
> .build-tmp/test.js

jasmine .build-tmp/test.js
