// this file contains the API functions that are exposed to boot.js.

inject('peripherals', function() {
  return 'todo'
})

inject('window', function() {
  return 'todo'
})

inject('API', ({window}) => (peripherals) => {
  var fileCallbacks = {}
  var keypressCallback = function() {}

  var api = {
    render,
    setInterval,
    log,
    onKeyPress,
    readFile,
    writeFile,
  }

  Object.freeze(api)

  return api

  // --- public API implementation ------------------------

  function render(lines) {
    peripherals.postMessage({
      type: 'render',
      lines: lines
    }, '*')
  }

  function setInterval(cb, timeout) {
    window.setInterval(cb, timeout)
  }

  function log(...args) {
    console.log(...args)
  }

  function onKeyPress(cb) {
    keypressCallback = cb
  }

  function readFile(filename, callback) {
    peripherals.postMessage({
      type: 'readFile',
      filename: filename
    }, '*')

    fileCallbacks[filename] = callback
  }

  function writeFile(filename, content) {
    console.log('api writing file', filename, content)
    peripherals.postMessage({
      type: 'writeFile',
      filename: filename,
      content: content
    }, '*')
  }

  // --- private methods ----------------------------------

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
    switch (event.data.type) {
      case 'keydown':
        handleKeyPress(event)
        break
      case 'fileReadComplete':
        handleFileReadComplete(event)
        break
    }
  })
})
