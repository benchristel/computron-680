inject('motherboard', function($) {
  var window           = $.window
  var API              = $.API
  var is               = $.Events.is
  var BOOT             = $.EventTypes.BOOT
  var bootFromJsString = $.bootFromJsString

  function boot(event) {
    if (!is(BOOT, event)) return
    bootFromJsString(event.data.script, API(event.source))
    // ensure we only boot once
    window.removeEventListener('message', boot)
  }

  window.addEventListener('message', boot)
})
