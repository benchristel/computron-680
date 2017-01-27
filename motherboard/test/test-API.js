describe('The API exposed to the OS', function() {
  var API
  var dispatchMessage
  var EventTypes

  beforeEach(function() {
    var $ = inject({window: {eval: eval}})
    API = $.API
    dispatchMessage = $.dispatchMessage
    EventTypes = $.EventTypes
  })

  it('provides a way to register a callback for keydown events', function() {
    var key = null
    API.onKeyDown(function(_key) {
      key = _key
    })

    expect(key).toBe(null)

    dispatchMessage({
      data: {
        type: EventTypes.KEY_DOWN,
        keyCode: 123
      }
    })

    expect(key).toEqual(123)
  })

  it('provides a way to register a callback for keyup events', function() {
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

  it('allows the OS to eval code', function() {
    expect(API.eval('1 + 1')).toEqual(2)
  })
})
