describe('API', function() {
  let peripherals, window
  beforeEach(() => {
    peripherals = {
      postMessage: jasmine.createSpy('postMessage')
    }

    window = {
      setInterval: jasmine.createSpy('setInterval')
    }
  })

  describe('.render', function() {
    it('sends a message telling the terminal to render', function() {
      let {API} = inject()

      API(peripherals).render(['hello'])

      expect(peripherals.postMessage).toHaveBeenCalledWith({
        type: 'render',
        lines: ['hello']
      }, '*')
    })
  })

  describe('.setInterval', () => {
    it('sets an interval timer on the window object', function() {
      let {API} = inject({window})
      let callback = function() {}

      API(peripherals).setInterval(callback, 123)

      expect(window.setInterval).toHaveBeenCalledWith(callback, 123)
    })
  })
})
