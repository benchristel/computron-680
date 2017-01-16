inject('HDD', function($) {
  var window = $.window
  window.HDD = {}

  HDD.read = function(filepath, callback) {
    connect(function(dir) {
      dir.getFile(filepath, {}, function(entry) {
        entry.file(function(file) {
          var reader = new FileReader()
          reader.onload = function(event) {
            reader.onload = null
            callback(null, event.target.result)
          }
          reader.readAsText(file)
        })
      }, function(err) {
        var msg = 'Could not find file `' + filepath + '`.'
        console.error(msg)
        callback(msg, '')
      })
    })
  }

  HDD.write = function(filepath, content) {
    console.log('HDD write', filepath, content.slice(0, 32))
    connect(function(dir) {
      dir.getFile(filepath, {create: true}, function(entry) {
        entry.createWriter(function(writer) {
          var bytes = new Blob([content])
          var truncated = false

          writer.onwriteend = function() {
            console.log('got onwriteend for ' + filepath)
            if (!truncated) {
              truncated = true
              this.truncate(bytes.size)
            }
          }

          writer.onerror = function() {
            console.error('Failed to write to `' + filepath + '`.', writer.error.message)
          }

          writer.write(bytes)
        })
      })
    })
  }

  var filesystemRoot = null
  function connect(callback) {
    if (filesystemRoot) {
      callback(filesystemRoot)
      return
    }

    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(dir) {
      filesystemRoot = dir
      callback(filesystemRoot)
    })
  }

  return HDD
})
