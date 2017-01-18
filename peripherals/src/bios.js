inject('bios', function($) {
  var window = $.window
  var HDD = $.HDD
  var Terminal = $.Terminal
  var BOOT = $.EventTypes.BOOT

  var motherboard = document.getElementById('motherboard')

  HDD.read('boot.js', function(err, code) {
    if (err) {
      Terminal.render([err])
      return
    }

    motherboard.contentWindow.postMessage({
      type: BOOT,
      script: code
    }, '*')
  })
})
