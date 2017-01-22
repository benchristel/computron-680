inject('dispatchMessage', function($) {
  return function(msgEvent) {
    switch ($.Events.type(msgEvent)) {
      case $.EventTypes.BOOT:
        $.bootOnce(msgEvent)
        break
      default:
        $.messageBus.publish(msgEvent)
    }
  }
})
