inject('keyboard', function($) {
  $.window.addEventListener('keydown', function(event) {
    $.postMessage($.motherboardWindow)($.EventTypes.KEY_DOWN, {
      key: event.key
    })
  })
})
