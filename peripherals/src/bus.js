inject('bus', function($) {
  var HDD = $.HDD
  var display = $.display
  var EventTypes = $.EventTypes
  var type = $.Events.type
  var postToMotherboard = $.postToMotherboard
  var motherboardWindow = $.motherboardWindow

  window.addEventListener('message', function(event) {
    // To avoid a security hole, we always check the source
    // of the event before reacting. Malicious pages can
    // send events to any window at any time!
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    if (event.source !== motherboardWindow) return

    switch (type(event)) {
      case EventTypes.READ_FILE:
        HDD.read(event.data.filename, function(err, content) {
          if (err) {
            postToMotherboard(
              EventTypes.FILE_READ_ERROR,
              {
                filename: event.data.filename,
                error: err
              })
          } else {
            postToMotherboard(
              EventTypes.FILE_READ_COMPLETE,
              {
                filename: event.data.filename,
                content: content
              })
          }
        })
        break
      case EventTypes.WRITE_FILE:
        HDD.write(event.data.filename, event.data.content)
        break
      case EventTypes.RENDER:
        display(event.data.lines)
        break
    }
  })
})
