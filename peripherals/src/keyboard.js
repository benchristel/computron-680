inject('keyboard', function() {
  window.addEventListener('load', function() {
    window.addEventListener('keydown', function(event) {
      motherboard.contentWindow.postMessage({
        type: 'keydown',
        key: event.key
      }, '*')
    })
  })
})
