// this file contains the API functions that are exposed to boot.js.

inject('API', function($) {
  var window = $.window
  var type   = $.Events.type
  var EventTypes = $.EventTypes

  return function(peripherals) {
    var api = {}
    var fileCallbacks = {}

    api.render = function(lines) {
      peripherals.postMessage({
        type: EventTypes.RENDER,
        lines: lines
      }, '*')
    }

    api.setInterval = window.setInterval.bind(window)
    api.console     = window.console

    api.onKeyPress = function() {}

    api.readFile = function(filename, callback) {
      peripherals.postMessage({
        type: EventTypes.READ_FILE,
        filename: filename
      }, '*')

      fileCallbacks[filename] = callback
    }

    api.writeFile = function(filename, content) {
      peripherals.postMessage({
        type: EventTypes.WRITE_FILE,
        filename: filename,
        content: content
      }, '*')
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

    window.addEventListener('message', function(event) {
      switch (type(event)) {
        case EventTypes.KEY_DOWN:
          handleKeyPress(event)
          break
        case EventTypes.FILE_READ_COMPLETE:
          handleFileReadComplete(event)
          break
      }
    })

    return api
  }
})
