describe('The API exposed to the OS', function() {
  it('provides a way to register a callback for keyboard events', function() {
    var $ = inject()
    var API = $.API
    var dispatchMessage = $.dispatchMessage
    var EventTypes = $.EventTypes

    var key = null
    API.onKeyPress(function(_key) {
      key = _key
    })

    dispatchMessage({data: { type: EventTypes.KEY_DOWN, key: 'a' }})
    expect(key).toBe('a')
  })
})
