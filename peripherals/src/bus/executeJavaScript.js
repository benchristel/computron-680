inject('executeJavaScript', ({sendToMotherboard, ExecuteJavaScriptMessage}) => {
  return function(script) {
    sendToMotherboard(ExecuteJavaScriptMessage(script))
  }
})
