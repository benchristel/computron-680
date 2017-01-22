// this file contains the API functions that are exposed to boot.js.

inject('API', function($) {
  var type   = $.Events.type
  var EventTypes = $.EventTypes
  var postMessage = $.postMessage
  var messageBus  = $.messageBus
  var peripherals = $.peripheralsWindow

  var api = {}
  var fileCallbacks = {}
  var postToPeripherals = postMessage(peripherals)

  api.render = function(lines) {
    postToPeripherals(EventTypes.RENDER, {
      lines: lines
    })
  }

  api.onKeyPress = function() {}

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
    if (api.onKeyPress) api.onKeyPress(event.data.key)
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
