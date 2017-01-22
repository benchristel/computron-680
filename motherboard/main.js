;(function() {
  var $ = null

  function init() {
    if (!$) {
      $ = inject()
    }

    return $
  }

  window.addEventListener('message', function(event) {
    init().dispatchMessage(event)
  })
})();
