inject('bios', function($) {
  var HDD = $.HDD
  var display = $.display
  var BOOT = $.EventTypes.BOOT
  var motherboardWindow = $.motherboardWindow

  HDD.read('boot.js', function(err, code) {
    if (err) {
      display([err])
      return
    }

    motherboardWindow.postMessage({
      type: BOOT,
      script: code
    }, '*')
  })
})
