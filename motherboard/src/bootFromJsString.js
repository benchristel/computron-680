inject('bootFromJsString', function($) {
  "use strict";

  var window = $.window

  return function bootFromJsString(js, C680) {
    var Object = window.Object
    eval($.cloakVars(js, [
      'Poppins',
      'inject',
      '$',
      'window',
      'bootFromJsString',
      'js'
    ].concat(Object.keys($.window))))
  }
})
