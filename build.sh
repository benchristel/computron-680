#!/bin/bash -e

which jasmine || npm install --global jasmine
mkdir -p .build-tmp

cat \
  $(find src -name 'makeStringExactlyScreenWidth.js') \
  $(find test -name 'test-*.js') \
> .build-tmp/test.js

jasmine .build-tmp/test.js
