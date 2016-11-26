describe('sendToMotherboard', function() {
  it("posts a JSONifiable message to the motherboard iframe's window", () => {
    let motherboard = {
      contentWindow: {
        postMessage: jasmine.createSpy('motherboard.contentWindow.postMessage')
      }
    }
    let {sendToMotherboard} = inject({motherboard})

    sendToMotherboard('a message')

    expect(motherboard.contentWindow.postMessage).toHaveBeenCalledWith('a message', '*')
  })
})
