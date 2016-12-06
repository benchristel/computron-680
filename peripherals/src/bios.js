/**
 * BIOS
 * ========================================================
 * This code bootstraps the system by reading and executing
 * a boot.js file.
 */

inject('bios', ({
  peripheralsBus,
  hdd,
  ExecuteJavaScriptMessage
}) => {
  return {
    boot
  }

  function boot() {
    hdd.readFile('boot.js', contents => {
      const msg = ExecuteJavaScriptMessage(contents)
      peripheralsBus.publish(msg)
    })
  }
})
