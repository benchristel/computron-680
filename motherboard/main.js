;(function() {
  var $ = null

  function init(peripheralsWindow) {
    if (!$) {
      $ = inject({
        peripheralsWindow: peripheralsWindow
      })
    }

    return $
  }

  window.addEventListener('message', function(event) {
    init(event.source).dispatchMessage(event)
  })
})();
