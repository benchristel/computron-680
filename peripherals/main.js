window.addEventListener('load', function() {
  var $ = inject({
    terminalLines: document.querySelectorAll('#terminal p')
  })
  $.bios
  $.bus
  $.keyboard
});
