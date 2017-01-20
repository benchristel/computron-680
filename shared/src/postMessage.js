inject('postMessage', function() {
  return function(targetWindow) {
    return function(type, message) {
      var messageWithType
        = Object.assign({}, message, {type: type})

      targetWindow.postMessage(messageWithType, '*')
    }
  }
})
