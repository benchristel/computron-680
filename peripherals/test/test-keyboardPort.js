describe('keyboardPort', function() {
  "use strict"

  var $

  beforeEach(function() {
    var postToMotherboard = jasmine.createSpy('postToMotherboard')

    $ = inject({
      postToMotherboard: postToMotherboard,
    })
  })

  it('sends an event to the motherboard when a key is pressed', function() {
    $.keyboardPort.handleKeyDown({
      keyCode: 123
    })

    expect($.postToMotherboard).toHaveBeenCalledWith(
      $.EventTypes.KEY_DOWN,
      {
        keyCode: 123
      }
    )
  })

  it('does not send an event when a key repeats', function() {
    $.keyboardPort.handleKeyDown({
      keyCode: 123,
      repeat: true
    })

    expect($.postToMotherboard).not.toHaveBeenCalled()
  })

  it('sends an event when a key is released', function() {
    $.keyboardPort.handleKeyUp({
      keyCode: 123
    })

    expect($.postToMotherboard).toHaveBeenCalledWith(
      $.EventTypes.KEY_UP,
      {
        keyCode: 123
      }
    )
  })
})
