describe('ExecuteJavaScriptMessage', () => {
  it('contains a script string', () => {
    let {ExecuteJavaScriptMessage} = inject()
    let message = ExecuteJavaScriptMessage('a script')
    expect(message.script).toBe('a script')
  })

  it('does not allow the script to be something other than a string', () => {
    let {ExecuteJavaScriptMessage} = inject()
    expect(() => {
      ExecuteJavaScriptMessage({})
    }).toThrowError('ExecuteJavaScriptMessage must be constructed with a string')
  })

  it('recognizes messages', () => {
    let {ExecuteJavaScriptMessage} = inject()
    let message = ExecuteJavaScriptMessage('something')
    expect(ExecuteJavaScriptMessage.is(message)).toBe(true)
  })

  it('does not recognize an object with only a script property', () => {
    let {ExecuteJavaScriptMessage} = inject()
    expect(ExecuteJavaScriptMessage.is({script: 'a'})).toBe(false)
  })

  it('does not recognize an object with only a type property', () => {
    let {ExecuteJavaScriptMessage} = inject()
    expect(ExecuteJavaScriptMessage.is({type: 'executeJavaScript'})).toBe(false)
  })

  it('does not recognize null', () => {
    let {ExecuteJavaScriptMessage} = inject()
    expect(ExecuteJavaScriptMessage.is(null)).toBe(false)
  })
})
