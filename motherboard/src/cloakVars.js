inject('cloakVars', function() {
  return function cloakVars(js, vars) {
    var declarations
      = vars.map(declareUndefined).join('')

    return iife(declarations + iife(js))
  }

  function declareUndefined(varname) {
    return 'var ' + varname + ';'
  }

  function iife(content) {
    return ';(function() { ' + content + ' })();'
  }
})
