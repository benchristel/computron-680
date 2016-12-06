inject('ExecuteJavaScriptMessage', () => {
  let ExecuteJavaScriptMessage = function(script) {
    assertString(script, 'ExecuteJavaScriptMessage must be constructed with a string')

    return {
      messageType: 'executeJavaScript',
      script
    }
  }

  ExecuteJavaScriptMessage.is = function(thing) {
    return !!(
      thing
      && 'executeJavaScript' === thing.messageType
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
