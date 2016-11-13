var Editor = {}

Editor.Buffer = function(text) {
  text = text || ''
  var lines = text.split('\n')
  var buffer = {}
  var x = 0
  var y = 0

  buffer.getCursorX = function() {
    return x
  }

  buffer.getCursorY = function() {
    return y
  }

  buffer.moveLeft = function() {
    if (x > 0) x -= 1
  }

  buffer.moveRight = function() {
    if (x < lines[y].length) x += 1
  }

  buffer.moveDown = function() {
    if (y < lines.length - 1) y += 1
  }

  buffer.moveUp = function() {
    y = 0
  }

  buffer.edit = function(text) {
    lines[y] =  text
  }

  buffer.openLine = function() {
    lines = [''].concat(lines)
  }

  buffer.getLines = function() {
    return lines
  }

  return buffer
}
