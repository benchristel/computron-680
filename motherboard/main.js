;(function() {
  var $ = null

  function init() {
    if (!$) {
      $ = inject()
    }
  }

  window.addEventListener('message', function(event) {
    init()
    $.motherboard.boot(event)
  })
})();
