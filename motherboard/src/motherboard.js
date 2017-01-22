inject('motherboard', function($) {
  var window           = $.window
  var API              = $.API
  var is               = $.Events.is
  var BOOT             = $.EventTypes.BOOT
  var bootFromJsString = $.bootFromJsString

  var bootedAlready = false

  return {
    boot: boot
  }

  function boot(event) {
    if (bootedAlready) return
    if (!is(BOOT, event)) return

    bootFromJsString(event.data.script, API(event.source))
    bootedAlready = true
  }
})
