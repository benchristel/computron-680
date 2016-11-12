console.log('in bootFromDisk.js')

window.addEventListener('load', function(event) {
  var motherboard = document.getElementById('motherboard')

  console.log('booting from disk')
  chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(dir) {
    console.log("chose directory", dir)
    readFile(dir, 'boot.js', function(contents) {
      console.log('file contents:', contents)
      // start the boot sequence
      motherboard.contentWindow.postMessage({script: contents}, '*')
    })
  })
})

function readFile(dir, filename, callback) {
  dir.getFile(filename, {}, function(entry) {
    entry.file(function(file) {
      var reader = new FileReader()
      reader.onload = function(event) {
        reader.onload = null
        callback(event.target.result)
      }
      reader.readAsText(file)
    })
  })
}
