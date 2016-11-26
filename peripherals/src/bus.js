inject('bus', ({executeJavaScript}) => {
  let bus = {
    executeJavaScript,
  }

  return bus
})
