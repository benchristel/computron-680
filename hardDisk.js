window.HDD = {}

HDD.read = function(filepath, callback) {
  connect(function(dir) {
    dir.getFile(filepath, {}, function(entry) {
      entry.file(function(file) {
        var reader = new FileReader()
        reader.onload = function(event) {
          reader.onload = null
          callback(event.target.result)
        }
        reader.readAsText(file)
      })
    })
  })
}

HDD.write = function() {
}

var filesystemRoot = null
function connect(callback) {
  if (filesystemRoot) return callback(filesystemRoot)

  chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(dir) {
    filesystemRoot = dir
    callback(filesystemRoot)
  })
}
