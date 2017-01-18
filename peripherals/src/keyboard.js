inject('keyboard', function($) {
  $.window.addEventListener('keydown', function(event) {
    motherboard.contentWindow.postMessage({
      type: $.EventTypes.KEY_DOWN,
      key: event.key
    }, '*')
  })
})
