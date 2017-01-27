window.addEventListener('load', function() {
  var $ = inject({
    terminalLines: document.querySelectorAll('#terminal p'),
    motherboardWindow:
      document.getElementById('motherboard').contentWindow
  })
  $.bios
  $.bus

  window.addEventListener('keydown', $.keyboardPort.handleKeyDown)
  window.addEventListener('keyup', $.keyboardPort.handleKeyUp)
});
