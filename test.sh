#!/bin/bash

set -e # exit immediately on error

source 'functions.sh'

test() {
  local dir="$1"
  echo "Starting tests for $dir ..."

  mkdir -p "$dir/.build_tmp"

  cat \
    lib/poppins.js \
    lib/injector.js \
    $(unique-source-files "$dir") \
    $(spec-files "$dir") \
    > "$dir/.build_tmp/spec.js"

  jasmine "$dir/.build_tmp/spec.js"

  echo "Finished tests for $dir."
}

test peripherals
test motherboard
test shared
