window.addEventListener('load', function() {
  var motherboard = document.getElementById('motherboard')
  var terminalLines = document.querySelectorAll('#terminal p')

  onMessage(function(message) {
    console.log('received message', message)
    render(message.lines)
  })

  window.addEventListener('keypress', function(event) {
    motherboard.contentWindow.postMessage(event.key, '*')
  })

  function onMessage(callback) {
    window.addEventListener('message', function(event) {
      // To avoid a security hole, we always check the source
      // of the event before reacting. Malicious pages can
      // send events to any window at any time!
      // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
      if (event.source === motherboard.contentWindow) {
        callback(event.data)
      }
    })
  }

  function render(lines) {
    for (var i = 0; i < terminalLines.length; i++) {
      terminalLines[i].innerText = lines[i] || ''
    }
  }
})
