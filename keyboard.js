window.addEventListener('load', function() {
  window.addEventListener('keypress', function(event) {
    motherboard.contentWindow.postMessage(event.key, '*')
  })
})
