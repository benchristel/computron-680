inject('bios', function($) {
  var HDD = $.HDD
  var display = $.display
  var BOOT = $.EventTypes.BOOT
  var motherboardWindow = $.motherboardWindow
  var postMessage = $.postMessage

  HDD.read('boot.js', function(err, code) {
    if (err) {
      display([err])
      return
    }

    postMessage(motherboardWindow)(BOOT, {
      script: code
    })
  })
})
