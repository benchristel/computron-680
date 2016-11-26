describe('executeJavaScript', () => {
  it('sends a message to the motherboard iframe', function() {
    let sendToMotherboard = jasmine.createSpy('sendToMotherboard')
    let {executeJavaScript, ExecuteJavaScriptMessage} = inject({sendToMotherboard})

    executeJavaScript('some javascript')

    expect(sendToMotherboard).toHaveBeenCalledWith(jasmine.any(Object))
    let message = sendToMotherboard.calls.mostRecent().args[0]
    expect(ExecuteJavaScriptMessage.is(message)).toBe(true)
    expect(message.script).toBe('some javascript')
  })
})
