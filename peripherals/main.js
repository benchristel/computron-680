window.addEventListener('load', function() {
  var $ = inject({
    terminalLines: document.querySelectorAll('#terminal p'),
    motherboardWindow:
      document.getElementById('motherboard').contentWindow
  })
  $.bios
  $.bus
  $.keyboard
});
