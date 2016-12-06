describe('bus', () => {
  let thisWindow, otherWindow, bus
  beforeEach(() => {
    thisWindow = {
      addEventListener: jasmine.createSpy('thisWindow.addEventListener')
    }

    otherWindow = {
      postMessage: jasmine.createSpy('otherWindow.postMessage')
    }

    const {Bus} = inject()
    bus = Bus(thisWindow, otherWindow)
  })

  it('publishes messages to subscribers', () => {
    let published = []
    bus.subscribe('foo', function(message) {
      published.push(message)
    })

    bus.publish({messageType: 'foo'})

    expect(published.length).toBe(1)
    expect(published[0]).toEqual({messageType: 'foo'})
  })

  it('does not publish to subscribers for a different message type', () => {
    let subscriptionCalls = 0
    bus.subscribe('foo', () => {
      subscriptionCalls++
    })

    bus.publish({messageType: 'bar'})

    expect(subscriptionCalls).toEqual(0)
  })

  it('sends messages to the other window', () => {
    const theMessage = {messageType: 'foo'}

    bus.publish(theMessage)

    expect(otherWindow.postMessage).toHaveBeenCalledWith(theMessage, '*')
  })

  it('broadcasts messages received by this window', () => {
    const event = {
      data: {messageType: 'my-type'}
    }

    expect(thisWindow.addEventListener).toHaveBeenCalledWith(
      'message',
      jasmine.any(Function)
    )

    let calls = 0
    bus.subscribe('my-type', () => {
      calls++
    })

    const messageCallback = thisWindow.addEventListener.calls.mostRecent().args[1]
    messageCallback(event)

    expect(calls).toBe(1)
  })
})
