describe('bootFromJsString', function() {
  function getBootFromJsString(C680) {
    return inject({
      API: C680,
      window: {
        Object: Object,
        console: {log: function() {}},
        alert: function() {}
      }
    }).bootFromJsString
  }

  it('executes the given JavaScript with the given C680 object in scope', function() {
    var C680 = {}
    var bootFromJsString = getBootFromJsString(C680)
    bootFromJsString('C680.foo = 1')
    expect(C680.foo).toEqual(1)
  })

  it('does not allow access to properties of the window object', function() {
    expect(function() {
      var C680 = {}
      var bootFromJsString = getBootFromJsString(C680)

      bootFromJsString('console.log(1)')
    }).toThrow()
  })

  it('does not allow access to the window object', function() {
    expect(function() {
      var C680 = {}
      var bootFromJsString = getBootFromJsString(C680)

      bootFromJsString('window.alert(1)')
    }).toThrow()
  })

  it('displays an error thrown by boot.js', function() {
    var C680 = {
      render: jasmine.createSpy('render')
    }
    var bootFromJsString = getBootFromJsString(C680)

    bootFromJsString('throw "foobar"')

    expect(C680.render).toHaveBeenCalledWith([
      'There was a problem running the boot.js file you selected:',
      '    foobar'
    ])
  })

  xit('allows access to Object', function() {
    expect(function() {
      var C680 = {}
      var bootFromJsString = getBootFromJsString(C680)

      bootFromJsString('Object.foo')
    }).not.toThrow()
  })
})
