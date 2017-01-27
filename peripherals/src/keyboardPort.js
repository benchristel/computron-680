inject('keyboardPort', function($) {
  return {
    handleKeyDown: handleKeyDown,
    handleKeyUp: handleKeyUp
  }

  function handleKeyDown(event) {
    if (event.repeat) return

    $.postToMotherboard(
      $.EventTypes.KEY_DOWN,
      {
        keyCode: event.keyCode
      }
    )
  }

  function handleKeyUp(event) {
    $.postToMotherboard(
      $.EventTypes.KEY_UP,
      {
        keyCode: event.keyCode
      }
    )
  }
})
