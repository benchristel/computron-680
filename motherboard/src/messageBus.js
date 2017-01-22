inject('messageBus', function($) {
  var type = $.Events.type

  var subscriptions = {}

  return {
    publish: publish,
    subscribe: subscribe
  }

  function publish(msgEvent) {
    var subs = subscriptions[type(msgEvent)] || []
    for (var i = 0; i < subs.length; i++) {
      subs[i](msgEvent)
    }
  }

  function subscribe(msgType, fn) {
    if (!subscriptions[msgType]) {
      subscriptions[msgType] = []
    }

    subscriptions[msgType].push(fn)
  }
})
