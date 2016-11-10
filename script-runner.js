window.addEventListener('message', function(event) {
  var BadOSExtensionOrigin =
    'chrome-extension://behahjpncgjkcbcnkngledgbikppjbhi'

  if (event.origin === BadOSExtensionOrigin) {
    var result = eval(event.data.script)
    event.source.postMessage({
      result: result
    }, BadOSExtensionOrigin)
  }


})
