describe('The API exposed to the OS', function() {
  it('provides a way to register a callback for keydown events', function() {
    var $ = inject()
    var API = $.API
    var dispatchMessage = $.dispatchMessage
    var EventTypes = $.EventTypes

    var key = null
    API.onKeyDown(function(_key) {
      key = _key
    })

    dispatchMessage({
      data: {
        type: EventTypes.KEY_DOWN,
        keyCode: 123
      }
    })

    expect(key).toEqual(123)
  })

  it('provides a way to register a callback for keyup events', function() {
    var $ = inject()
    var API = $.API
    var dispatchMessage = $.dispatchMessage
    var EventTypes = $.EventTypes

    var key = null
    API.onKeyUp(function(_key) {
      key = _key
    })

    expect(key).toBe(null)

    dispatchMessage({
      data: {
        type: EventTypes.KEY_UP,
        keyCode: 123
      }
    })

    expect(key).toEqual(123)
  })
})
