window.addEventListener('load', function() {
  var motherboard = document.getElementById('motherboard')

  HDD.read('boot.js', function(code) {
    motherboard.contentWindow.postMessage({type: 'boot', script: code}, '*')
  })
})
