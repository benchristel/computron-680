describe('motherboard', () => {
  it('is the DOM element with id `motherboard`', () => {
    let document = {
      getElementById: jasmine.createSpy('document.getElementById')
        .and.returnValue('fake motherboard element')
    }

    let {motherboard} = inject({document})

    expect(motherboard).toBe('fake motherboard element')
  })
})
