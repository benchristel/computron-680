describe('bus', function() {
  it('exposes the executeJavaScript method', function() {
    let {bus, executeJavaScript} = inject({motherboard: {}})
    expect(bus.executeJavaScript).toBe(executeJavaScript)
  })
})
