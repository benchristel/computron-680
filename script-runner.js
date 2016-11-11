"use strict";

var BadOSExtensionOrigin =
  'chrome-extension://behahjpncgjkcbcnkngledgbikppjbhi'

var __scriptRunnerUtil__ = {}

__scriptRunnerUtil__.boot = function(event) {
  if (!event.data.script) return

  if (event.origin === BadOSExtensionOrigin) {
    var varsToCloak = [
      'window',
      'BadOSExtensionOrigin',
      '__scriptRunnerUtil__',
      'event',
      'varsToCloak'
    ].concat(Object.keys(window))

    // render is intentionally exposed to the eval'd script.
    // don't cloak it!
    function render(lines) {
      console.log('called render')
      event.source.postMessage({
        lines: lines
      }, BadOSExtensionOrigin)
    }

    // onMessage is intentionally exposed to the eval'd script.
    // don't cloak it!
    function onMessage(callback) {
      window.addEventListener('message', callback)
    }

    eval(__scriptRunnerUtil__.cloakVars(event.data.script, varsToCloak))

    // ensure we only boot once
    window.removeEventListener('message', __scriptRunnerUtil__.boot)
  }
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
