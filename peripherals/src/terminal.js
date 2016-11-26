inject('terminal', ({terminalDomElements}) => {
  return {
    render
  }

  function render(lines) {
    for (var i = 0; i < terminalDomElements.length; i++) {
      terminalDomElements[i].innerText = lines[i] || ''
    }
  }
})
