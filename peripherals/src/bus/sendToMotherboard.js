inject('sendToMotherboard', ({motherboard}) => {
  return function(message) {
    motherboard.contentWindow.postMessage(message, '*')
  }
})
