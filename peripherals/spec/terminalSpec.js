describe('Terminal', function() {
  it('clears the DOM elements given an empty list of lines', function() {
    var terminalDomElements = [{}, {}]
    var {terminal} = inject({terminalDomElements})

    terminal.render([])

    expect(terminalDomElements[0].innerText).toEqual('')
    expect(terminalDomElements[1].innerText).toEqual('')
  })

  it('sets the innerText of the DOM elements', function() {
    var terminalDomElements = [{}, {}]
    var {terminal} = inject({terminalDomElements})

    terminal.render(['a', 'b'])

    expect(terminalDomElements[0].innerText).toEqual('a')
    expect(terminalDomElements[1].innerText).toEqual('b')
  })

  it('ignores extra strings', function() {
    var terminalDomElements = [{}, {}]
    var {terminal} = inject({terminalDomElements})

    terminal.render(['a', 'b', 'c'])

    expect(terminalDomElements[0].innerText).toEqual('a')
    expect(terminalDomElements[1].innerText).toEqual('b')
  })

  it('fills extra elements with empty strings', function() {
    var terminalDomElements = [{}, {}]
    var {terminal} = inject({terminalDomElements})

    terminal.render(['a'])

    expect(terminalDomElements[0].innerText).toEqual('a')
    expect(terminalDomElements[1].innerText).toEqual('')
  })
})
