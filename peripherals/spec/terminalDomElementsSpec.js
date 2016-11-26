describe('terminalDomElements', function() {
  it('is a list of the `p` elements in the element with ID `terminal`', function() {
    var document = {
      querySelectorAll: jasmine.createSpy('querySelectorAll')
    }

    document.querySelectorAll.and.returnValue(['dummy'])

    expect(inject({document}).terminalDomElements).toEqual(['dummy'])
    expect(document.querySelectorAll).toHaveBeenCalledWith('#terminal p')
  })
})
