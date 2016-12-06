describe('bios', function() {
  it('reads from a boot.js file on boot', function() {
    let peripheralsBus = {
    }
    let hdd = {
      readFile: jasmine.createSpy('hdd.readFile')
    }
    let {bios} = inject({peripheralsBus, hdd})

    bios.boot()

    expect(hdd.readFile).toHaveBeenCalledWith('boot.js', jasmine.any(Function))
  })

  it('executes the boot.js file when it loads', function() {
    const peripheralsBus = {
      publish: jasmine.createSpy('peripheralsBus.publish')
    }

    const hdd = {
      readFile: function(filename, callback) {
        callback('file contents')
      }
    }

    const {
      bios,
      ExecuteJavaScriptMessage
    } = inject({peripheralsBus, hdd})

    bios.boot()

    expect(peripheralsBus.publish).toHaveBeenCalled()
    const publishedMessage = peripheralsBus.publish.calls.mostRecent().args[0]
    expect(ExecuteJavaScriptMessage.is(publishedMessage))
      .toBe(true)
  })
})
