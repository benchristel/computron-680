describe('The API exposed to the OS', function() {
  var API
  var dispatchMessage
  var EventTypes
  var postToPeripherals

  beforeEach(function() {
    postToPeripherals = jasmine.createSpy('postToPeripherals')
    var $ = inject({
      window: {eval: eval},
      postToPeripherals: postToPeripherals
    })
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

  it('provides a way to read files', function() {
    var data = null
    var err = null
    API.readFile('foo.js', function(_err, _data) {
      data = _data
      err = _err
    })

    expect(err).toBe(null)
    expect(data).toBe(null)
    expect(postToPeripherals).toHaveBeenCalledWith(EventTypes.READ_FILE, {filename: 'foo.js'})

    dispatchMessage({
      data: {
        type: EventTypes.FILE_READ_COMPLETE,
        filename: 'foo.js',
        content: 'the file content'
      }
    })

    expect(err).toBe(null)
    expect(data).toEqual('the file content')
  })

  it('calls the callback with an error when reading a file fails', function() {
    var data = null
    var err = null
    API.readFile('foo.js', function(_err, _data) {
      data = _data
      err = _err
    })

    expect(err).toBe(null)
    expect(postToPeripherals).toHaveBeenCalledWith(EventTypes.READ_FILE, {filename: 'foo.js'})

    dispatchMessage({
      data: {
        type: EventTypes.FILE_READ_ERROR,
        filename: 'foo.js',
        error: 'epic fail!'
      }
    })

    expect(err).toEqual('epic fail!')
    expect(data).toBe(null)
  })

  it('only calls file read callbacks once', function() {
    var calls = 0
    API.readFile('foo.js', function(_err, _data) {
      calls++
    })

    expect(calls).toBe(0)

    dispatchMessage({
      data: {
        type: EventTypes.FILE_READ_COMPLETE,
        filename: 'foo.js',
        content: 'the file content'
      }
    })

    expect(calls).toBe(1)

    dispatchMessage({
      data: {
        type: EventTypes.FILE_READ_COMPLETE,
        filename: 'foo.js',
        content: 'the file content'
      }
    })

    expect(calls).toBe(1)
  })
})
