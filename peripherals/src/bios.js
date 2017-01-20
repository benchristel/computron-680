inject('bios', function($) {
  var window = $.window
  var HDD = $.HDD
  var display = $.display
  var BOOT = $.EventTypes.BOOT

  var motherboard = document.getElementById('motherboard')

  HDD.read('boot.js', function(err, code) {
    if (err) {
      display([err])
      return
    }

    motherboard.contentWindow.postMessage({
      type: BOOT,
      script: code
    }, '*')
  })
})
