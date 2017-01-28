inject('EventTypes', function() {
  return {
    BOOT: 'boot',
    KEY_DOWN: 'keydown',
    KEY_UP: 'keyup',
    FILE_READ_COMPLETE: 'fileReadComplete',
    FILE_READ_ERROR: 'fileReadError',
    RENDER: 'render',
    READ_FILE: 'readFile',
    WRITE_FILE: 'writeFile'
  }
})
