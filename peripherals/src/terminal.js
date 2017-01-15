inject('Terminal', function() {
  var Terminal = {}
  var terminalLines = document.querySelectorAll('#terminal p')

  Terminal.render = function(lines) {
    for (var i = 0; i < terminalLines.length; i++) {
      terminalLines[i].innerText = makeStringExactlyScreenWidth(64, lines[i])
    }
  }

  return Terminal
})
