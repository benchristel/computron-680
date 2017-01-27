C680.readFile('shell.js', function(js) {
  var shell = C680.eval(js)

  shell(C680)
})

C680.onKeyDown(function(code) {
  C680.render([''+code])
})

C680.onKeyUp(function(code) {
  C680.render([])
})
