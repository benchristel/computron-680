inject('bootFromJsString', function($) {
  "use strict";

  var window = $.window
  var C680 = $.API

  return function bootFromJsString(js) {
    var Object = window.Object
    var scriptWithCloakedVars = $.cloakVars(js, [
      'Poppins',
      'inject',
      '$',
      'window',
      'bootFromJsString',
      'js'
    ].concat(Object.keys($.window)))

    try {
      eval(scriptWithCloakedVars)
    } catch(e) {
      var lines = [
        'There was a problem running the boot.js file you selected:',
        '    ' + e.toString(),
      ]

      C680.render(lines)
    }
  }
})
