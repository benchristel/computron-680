(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

if (typeof global !== 'undefined') global.Poppins = require('./index.js')
if (typeof window !== 'undefined') window.Poppins = require('./index.js')

},{"./index.js":2}],2:[function(require,module,exports){
require('./proxy-polyfill.js')
var shallowCopy = require('shallow-copy')
var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function(logger) {
  logger = logger || console
  var factories = {}
  var proxyMightHaveFrozenFactoriesObject = false

  return function() {
    validateArguments(arguments)

    if (arguments.length === 2) {
      if (proxyMightHaveFrozenFactoriesObject) {
        throw new Error("Poppins: You can't register a new module now because some modules have already been built.")
      }
      registerModule.apply(null, arguments)
    } else {
      return buildDependencyProvider(arguments[0])
    }
  }

  function registerModule (name, factory) {
    factories[name] = factory
  }

  function buildDependencyProvider (overrides) {
    validateOverrides(overrides)
    var cache = shallowCopy(overrides) || {}
    var requireStack = []

    var provider = new Proxy(factories, {
      get: function (factories, name) {
        if (requireStack.indexOf(name) > -1) {
          throw new Error('Poppins: Could not build ' + name + ' because there is a dependency cycle: ' + requireStack.join(' -> ') + ' -> ' + name)
        }

        requireStack.push(name)

        if (!hasOwnProperty.call(cache, name)) {
          cache[name] = buildModule(name, provider)
        }

        requireStack.pop()

        return cache[name]
      }
    })

    proxyMightHaveFrozenFactoriesObject = true

    return provider
  }

  function buildModule(name, provider) {
    if (!hasOwnProperty.call(factories, name)) {
      throw new Error('Poppins: No factory registered for requested module "' + name + '"')
    }
    return factories[name](provider)
  }

  function validateOverrides(overrides) {
    if (!overrides) return

    for (var key in overrides) {
      if (hasOwnProperty.call(overrides, key) && !hasOwnProperty.call(factories, key)) {
        throw new Error("Poppins: You're trying to override " + key + ", but there is no such module.")
      }
    }
  }
}

function validateArguments(args) {
  var message = 'Poppins was called with unexpected arguments. You may want to have a look at the docs: https://github.com/benchristel/poppins/'

  if (args.length === 1) {
    if (typeof args[0] !== 'object') {
      throw Error(message)
    }
  } else if (args.length === 2) {
    if (typeof args[0] !== 'string' || typeof args[1] !== 'function') {
      throw Error(message)
    }
  } else if (args.length > 2) {
    throw Error(message)
  }
}

},{"./proxy-polyfill.js":4,"shallow-copy":3}],3:[function(require,module,exports){
module.exports = function (obj) {
    if (!obj || typeof obj !== 'object') return obj;

    var copy;

    if (isArray(obj)) {
        var len = obj.length;
        copy = Array(len);
        for (var i = 0; i < len; i++) {
            copy[i] = obj[i];
        }
    }
    else {
        var keys = objectKeys(obj);
        copy = {};

        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            copy[key] = obj[key];
        }
    }
    return copy;
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) keys.push(key);
    }
    return keys;
};

var isArray = Array.isArray || function (xs) {
    return {}.toString.call(xs) === '[object Array]';
};

},{}],4:[function(require,module,exports){
(function (global){
/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function(d){function k(a){return a?"object"==typeof a||"function"==typeof a:!1}if(!d.Proxy){var l=null;d.a=function(a,c){function d(){}if(!k(a)||!k(c))throw new TypeError("Cannot create proxy with a non-object as target or handler");l=function(){d=function(b){throw new TypeError("Cannot perform '"+b+"' on a proxy that has been revoked");}};var f=c;c={get:null,set:null,apply:null,construct:null};for(var g in f){if(!(g in c))throw new TypeError("Proxy polyfill does not support trap '"+g+"'");c[g]=
f[g]}"function"==typeof f&&(c.apply=f.apply.bind(f));var e=this,m=!1,n="function"==typeof a;if(c.apply||c.construct||n)e=function(){var b=this&&this.constructor===e;d(b?"construct":"apply");if(b&&c.construct)return c.construct.call(this,a,arguments);if(!b&&c.apply)return c.apply(a,this,arguments);if(n)return b?(b=Array.prototype.slice.call(arguments),b.unshift(a),new (a.bind.apply(a,b))):a.apply(this,arguments);throw new TypeError(b?"not a constructor":"not a function");},m=!0;var p=c.get?function(b){d("get");
return c.get(this,b,e)}:function(b){d("get");return this[b]},r=c.set?function(b,a){d("set");c.set(this,b,a,e)}:function(a,c){d("set");this[a]=c},q={};Object.getOwnPropertyNames(a).forEach(function(b){m&&b in e||(Object.defineProperty(e,b,{enumerable:!!Object.getOwnPropertyDescriptor(a,b).enumerable,get:p.bind(a,b),set:r.bind(a,b)}),q[b]=!0)});f=!0;Object.setPrototypeOf?Object.setPrototypeOf(e,Object.getPrototypeOf(a)):e.__proto__?e.__proto__=a.__proto__:f=!1;if(c.get||!f)for(var h in a)q[h]||Object.defineProperty(e,
h,{get:p.bind(a,h)});Object.seal(a);Object.seal(e);return e};d.a.b=function(a,c){return{proxy:new d.a(a,c),revoke:l}};d.a.revocable=d.a.b;d.Proxy=d.a}})("undefined"!==typeof module&&module.exports?global:window);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
"use strict"

inject = Poppins()
/**
 * BIOS
 * ========================================================
 * This code bootstraps the system by reading and executing
 * a boot.js file.
 */

inject('bios', ({bus, hdd}) => {
  return {
    boot
  }

  function boot() {
    hdd.readFile('boot.js', bus.executeJavaScript)
  }
})
inject('executeJavaScript', ({sendToMotherboard, ExecuteJavaScriptMessage}) => {
  return function(script) {
    sendToMotherboard(ExecuteJavaScriptMessage(script))
  }
})
inject('ExecuteJavaScriptMessage', () => {
  let ExecuteJavaScriptMessage = function(script) {
    assertString(script, 'ExecuteJavaScriptMessage must be constructed with a string')

    return {
      type: 'executeJavaScript',
      script
    }
  }

  ExecuteJavaScriptMessage.is = function(thing) {
    return !!(
      thing
      && 'executeJavaScript' === thing.type
      && isString(thing.script)
    )
  }

  return ExecuteJavaScriptMessage

  // --- private methods ----------------------------------

  function assertString(thing, message) {
    if (!isString(thing)) {
      throw new Error(message)
    }
  }

  function isString(thing) {
    return typeof thing === 'string'
  }
})
inject('sendToMotherboard', ({motherboard}) => {
  return function(message) {
    motherboard.contentWindow.postMessage(message, '*')
  }
})
inject('bus', ({executeJavaScript}) => {
  let bus = {
    executeJavaScript,
  }

  return bus
})
/* there are no tests for `document`, since tests need to run in Node */
inject('document', () => {
  return window.document
})
inject('hdd', () => {
  return {
    readFile: function(filepath, callback) {
      connect(function(dir) {
        dir.getFile(filepath, {}, function(entry) {
          entry.file(function(file) {
            var reader = new FileReader()
            reader.onload = function(event) {
              reader.onload = null
              callback(event.target.result)
            }
            reader.readAsText(file)
          })
        })
      })
    },

    writeFile: function(filepath, content) {
      console.log('HDD write', filepath, content.slice(0, 32))
      connect(function(dir) {
        dir.getFile(filepath, {create: true}, function(entry) {
          entry.createWriter(function(writer) {
            var bytes = new Blob([content])
            var truncated = false

            writer.onwriteend = function() {
              console.log('got onwriteend for ' + filepath)
              if (!truncated) {
                truncated = true
                this.truncate(bytes.size)
              }
            }

            writer.onerror = function() {
              console.error('Failed to write to `' + filepath + '`.', writer.error.message)
            }

            writer.write(bytes)
          })
        })
      })
    }
  }

  // --- private methods ----------------------------------

  var filesystemRoot = null
  function connect(callback) {
    if (filesystemRoot) return callback(filesystemRoot)

    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(dir) {
      filesystemRoot = dir
      callback(filesystemRoot)
    })
  }
})
inject('motherboard', ({document}) => {
  return document.getElementById('motherboard')
})
inject('terminal', ({terminalDomElements}) => {
  return {
    render
  }

  function render(lines) {
    for (var i = 0; i < terminalDomElements.length; i++) {
      terminalDomElements[i].innerText = lines[i] || ''
    }
  }
})
inject('terminalDomElements', ({document}) => {
  return document.querySelectorAll('#terminal p')
})