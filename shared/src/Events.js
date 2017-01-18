inject('Events', function() {
  return {
    is: function(eventType, event) {
      return event.data.type === eventType
    }
  }
})
