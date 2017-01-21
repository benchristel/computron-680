describe('bootFromJsString', function() {
  function fakeWindow() {
    return {
      Object: Object,
      console: {log: function() {}},
      alert: function() {}
    }
  }

  it('executes the given JavaScript with the given C680 object in scope', function() {
    var C680 = {}
    var bootFromJsString = inject({window: fakeWindow()}).bootFromJsString
    bootFromJsString('C680.foo = 1', C680)
    expect(C680.foo).toEqual(1)
  })

  it('does not allow access to properties of the window object', function() {
    expect(function() {
      var C680 = {}
      var bootFromJsString = inject({window: fakeWindow()}).bootFromJsString

      bootFromJsString('console.log(1)', C680)
    }).toThrow()
  })

  it('does not allow access to the window object', function() {
    expect(function() {
      var C680 = {}
      var bootFromJsString = inject({window: fakeWindow()}).bootFromJsString

      bootFromJsString('window.alert(1)', C680)
    }).toThrow()
  })

  it('displays an error thrown by boot.js', function() {
    var C680 = {
      render: jasmine.createSpy('render')
    }
    var bootFromJsString = inject({window: fakeWindow()}).bootFromJsString

    bootFromJsString('throw "foobar"', C680)

    expect(C680.render).toHaveBeenCalledWith([
      'There was a problem running the boot.js file you selected:',
      '    foobar'
    ])
  })

  xit('allows access to Object', function() {
    expect(function() {
      var C680 = {}
      var bootFromJsString = inject({window: fakeWindow()}).bootFromJsString

      bootFromJsString('Object.foo', C680)
    }).not.toThrow()
  })
})
