describe('bios', function() {
  it('reads from a boot.js file on boot', function() {
    let bus = {
      executeJavaScript: function() {}
    }
    let hdd = {
      readFile: jasmine.createSpy('hdd.readFile')
    }
    let {bios} = inject({bus, hdd})

    bios.boot()

    expect(hdd.readFile).toHaveBeenCalledWith('boot.js', jasmine.any(Function))
  })

  it('executes the boot.js file when it loads', function() {
    let bus = {
      executeJavaScript: jasmine.createSpy('bus.executeJavaScript')
    }
    let hdd = {
      readFile: function(filename, callback) {
        callback('file contents')
      }
    }
    let {bios} = inject({bus, hdd})

    bios.boot()

    expect(bus.executeJavaScript).toHaveBeenCalledWith('file contents')
  })
})
