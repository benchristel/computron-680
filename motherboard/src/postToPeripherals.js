inject('postToPeripherals', function($) {
  return function(type, data) {
    return $.postMessage($.peripheralsWindow)(type, data)
  }
})
