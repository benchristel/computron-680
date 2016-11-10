window.addEventListener('load', function() {
  var scriptRunner = document.getElementById('script-runner');
  var resultOutput = document.getElementById('state')
  var runButton = document.getElementById('run')
  var codeInput = document.getElementById('code-to-eval')

  onMessage(function(message) {
    resultOutput.innerText = message.result
  })

  runButton
    .addEventListener('click', function() {
      var code = codeInput.value
      scriptRunner.contentWindow.postMessage({
        script: code
      }, '*')
    })

  function onMessage(callback) {
    window.addEventListener('message', function(event) {
      // To avoid a security hole, we always check the origin
      // of the event before reacting. Malicious pages can
      // send events to any window at any time!
      // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
      if (event.source === scriptRunner.contentWindow) {
        callback(event.data)
      }
    })
  }
})
