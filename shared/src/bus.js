inject('Bus', () => (thisWindow, otherWindow) => {
  const subscriptions = []

  thisWindow.addEventListener('message', event => {
    broadcastToSubscribers(event.data)
  })

  return {
    publish,
    subscribe
  }

  function publish(message) {
    broadcastToSubscribers(message)

    otherWindow.postMessage(message, '*')
  }

  function subscribe(messageType, callback) {
    subscriptions.push({messageType, callback})
  }

  function broadcastToSubscribers(message) {
    subscriptions
      .filter(sub => sub.messageType === message.messageType)
      .forEach(subscription => {
        subscription.callback(message)
      })

  }
})
