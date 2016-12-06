source-files() {
  local dir="$1"

  echo $(find "shared/src" -name '*.js')
  echo $(find "$dir/src"   -name '*.js')
}

unique-source-files() {
  local dir="$1"

  echo $(source-files "$dir" | sort | uniq)
}

spec-files() {
  local dir="$1"

  echo $(find "$dir/spec" -name '*.js')
}
