inject('display', function($) {
  return function(lines) {
    for (var i = 0; i < $.terminalLines.length; i++) {
      $.terminalLines[i].innerText = makeStringExactlyScreenWidth(64, lines[i])
    }
  }
})
