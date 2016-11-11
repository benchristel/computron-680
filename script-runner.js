"use strict";

window.addEventListener('message', function(event) {
  var BadOSExtensionOrigin =
    'chrome-extension://behahjpncgjkcbcnkngledgbikppjbhi'

  if (event.origin === BadOSExtensionOrigin) {
    var varsToCloak = [
      'event',
      'BadOSExtensionOrigin',
      'varsToCloak',
      'result',
      '__scriptRunnerUtil__'
    ]
    var result = eval(__scriptRunnerUtil__.cloakVars(event.data.script, varsToCloak))

    function render(lines) {
      console.log('called render')
      event.source.postMessage({
        lines: lines
      }, BadOSExtensionOrigin)
    }
  }
})

var __scriptRunnerUtil__ = {}

__scriptRunnerUtil__.cloakVars = function(script, extraVars) {
  var iife = __scriptRunnerUtil__.iife
  var defineAsUndefined = __scriptRunnerUtil__.defineAsUndefined
  var cloak = extraVars
    .concat(Object.keys(window))
    .concat(['window'])
    .map(defineAsUndefined)
    .join('')

  return iife(cloak + iife(script))
}

__scriptRunnerUtil__.iife = function(script) {
  return ';(function() {' + script + '})();'
}

__scriptRunnerUtil__.defineAsUndefined = function(varName) {
  return 'var ' + varName + ' = undefined;'
}
