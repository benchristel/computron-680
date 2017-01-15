var SPACES = Array(65).join(' ')

function makeStringExactlyScreenWidth(width, s) {
  if (!s) {
    return SPACES.slice(0, width)
  }

  if (s.length < width) {
    return s + SPACES.slice(0, width - s.length)
  }

  return s.slice(0, width)
}
