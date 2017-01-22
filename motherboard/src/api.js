// this file contains the API functions that are exposed to boot.js.

inject('API', function($) {
  var EventTypes        = $.EventTypes
  var messageBus        = $.messageBus
  var postToPeripherals = $.postToPeripherals

  var api = {}
  var fileCallbacks = {}
  var keyPressCallback = function() {}

  api.render = function(lines) {
    postToPeripherals(EventTypes.RENDER, {
      lines: lines
    })
  }

  api.onKeyPress = function(callback) {
    keyPressCallback = callback
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

  function handleKeyPress(event) {
    keyPressCallback(event.data.key)
  }

  function handleFileReadComplete(event) {
    var filename = event.data.filename
    if (fileCallbacks[filename]) {
      fileCallbacks[filename](event.data.content)
      delete fileCallbacks[filename]
    }
  }

  messageBus.subscribe(EventTypes.KEY_DOWN, handleKeyPress)
  messageBus.subscribe(EventTypes.FILE_READ_COMPLETE, handleFileReadComplete)

  return api
})
