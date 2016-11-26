inject('hdd', () => {
  return {
    readFile: function(filepath, callback) {
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
    },

    writeFile: function(filepath, content) {
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
  }

  // --- private methods ----------------------------------

  var filesystemRoot = null
  function connect(callback) {
    if (filesystemRoot) return callback(filesystemRoot)

    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(dir) {
      filesystemRoot = dir
      callback(filesystemRoot)
    })
  }
})
