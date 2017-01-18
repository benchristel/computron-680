inject('Events', function() {
  return {
    is: function(eventType, event) {
      return type(event) === eventType
    },

    type: type
  }

  function type(event) {
    return event.data.type
  }
})
