inject('postToMotherboard', function($) {
  return $.postMessage($.motherboardWindow)
})
