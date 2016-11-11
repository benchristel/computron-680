window.addEventListener('message', function(event) {
  var BadOSExtensionOrigin =
    'chrome-extension://behahjpncgjkcbcnkngledgbikppjbhi'

  if (event.origin === BadOSExtensionOrigin) {
    var result = eval(event.data.script)

    function render(lines) {
      console.log('called render')
      event.source.postMessage({
        lines: lines
      }, BadOSExtensionOrigin)
    }
  }
})
