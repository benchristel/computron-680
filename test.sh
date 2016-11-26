set -e # exit immediately on error

test() {
  local dir="$1"
  echo "Starting tests for $dir ..."

  mkdir -p "$dir/.build_tmp"

  cat \
    lib/poppins.js \
    lib/injector.js \
    $(find "$dir/src"  -name '*.js') \
    $(find "$dir/spec" -name '*.js') \
    > "$dir/.build_tmp/spec.js"

  jasmine "$dir/.build_tmp/spec.js"

  echo "Finished tests for $dir."
}

test peripherals
test motherboard
