inject('motherboard', function($) {
  var window           = $.window
  var API              = $.API
  var bootFromJsString = $.bootFromJsString

  function boot(event) {
    if (event.data.type !== 'boot') return
    bootFromJsString(event.data.script, API(event.source))
    // ensure we only boot once
    window.removeEventListener('message', boot)
  }

  window.addEventListener('message', boot)
})
