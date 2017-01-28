// this file contains the API functions that are exposed to boot.js.

inject('API', function($) {
  var EventTypes        = $.EventTypes
  var messageBus        = $.messageBus
  var postToPeripherals = $.postToPeripherals
  var window            = $.window

  var api = {}
  var fileCallbacks = {}
  var keyDownCallback = function() {}
  var keyUpCallback = function() {}

  api.render = function(lines) {
    postToPeripherals(EventTypes.RENDER, {
      lines: lines
    })
  }

  api.onKeyDown = function(callback) {
    keyDownCallback = callback
  }

  api.onKeyUp = function(callback) {
    keyUpCallback = callback
  }

  api.readFile = function(filename, callback) {
    postToPeripherals(EventTypes.READ_FILE, {
      filename: filename
    })

    fileCallbacks[filename] = callback
  }

  api.writeFile = function(filename, content) {
    postToPeripherals(EventTypes.WRITE_FILE, {
      filename: filename,
      content: content
    })
  }

  api.eval = window.eval

  function handleKeyDown(event) {
    keyDownCallback(event.data.keyCode)
  }

  function handleKeyUp(event) {
    keyUpCallback(event.data.keyCode)
  }

  function handleFileReadComplete(event) {
    resolveFileCallback(event.data.filename, null, event.data.content)
  }

  function handleFileReadError(event) {
    resolveFileCallback(event.data.filename, event.data.error, null)
  }

  function resolveFileCallback(filename, err, content) {
    if (fileCallbacks[filename]) {
      fileCallbacks[filename](err, content)
      delete fileCallbacks[filename]
    }
  }

  messageBus.subscribe(EventTypes.KEY_DOWN, handleKeyDown)
  messageBus.subscribe(EventTypes.KEY_UP, handleKeyUp)
  messageBus.subscribe(EventTypes.FILE_READ_COMPLETE, handleFileReadComplete)
  messageBus.subscribe(EventTypes.FILE_READ_ERROR, handleFileReadError)

  return api
})
