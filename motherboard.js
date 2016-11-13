"use strict";

var __scriptRunnerUtil__ = {}

__scriptRunnerUtil__.boot = function(event) {
  if (event.data.type !== 'boot') return

  var varsToCloak = [
    'window',
    '__scriptRunnerUtil__',
    'event',
    'varsToCloak'
  ].concat(Object.keys(window))

  // intentionally exposed to the eval'd script.
  var C680 = API(event.source)

  eval(__scriptRunnerUtil__.cloakVars(event.data.script, varsToCloak))

  // ensure we only boot once
  window.removeEventListener('message', __scriptRunnerUtil__.boot)
}

window.addEventListener('message', __scriptRunnerUtil__.boot)

__scriptRunnerUtil__.cloakVars = function(script, vars) {
  var iife = __scriptRunnerUtil__.iife
  var defineAsUndefined = __scriptRunnerUtil__.defineAsUndefined
  var cloak = vars
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
