var Terminal = {}

;(function() {
  var terminalLines = []

  window.addEventListener('load', function() {
    terminalLines = document.querySelectorAll('#terminal p')
  })

  Terminal.render = function(lines) {
    for (var i = 0; i < terminalLines.length; i++) {
      terminalLines[i].innerText = exactlyScreenWidth(lines[i])
    }
  }

  var SPACES = Array(65).join(' ')
  if (SPACES.length != 64) throw 'oops'

  function exactlyScreenWidth(s) {
    if (!s) {
      return SPACES
    }

    if (s.length < 64) {
      return s + SPACES.slice(64 - s.length)
    } else {
      return s.slice(0, 64)
    }
  }
})();
