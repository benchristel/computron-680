var Bus = {}

window.addEventListener('load', function() {
  var motherboard = document.getElementById('motherboard')

  window.addEventListener('message', function(event) {
    // To avoid a security hole, we always check the source
    // of the event before reacting. Malicious pages can
    // send events to any window at any time!
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    if (event.source !== motherboard.contentWindow) return

    switch (event.data.type) {
      case 'readFile':
        HDD.read(event.data.filename, function(content) {
          event.source.postMessage({
            type: 'fileReadComplete',
            filename: event.data.filename,
            content: content
          }, '*')
        })
        break
      case 'writeFile':
        HDD.write(event.data.filename, event.data.content)
        break
      case 'render':
        Terminal.render(event.data.lines)
        break
    }
  })
})
