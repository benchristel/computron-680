/**
 * BIOS
 * ========================================================
 * This code bootstraps the system by reading and executing
 * a boot.js file.
 */

inject('bios', ({bus, hdd}) => {
  return {
    boot
  }

  function boot() {
    hdd.readFile('boot.js', bus.executeJavaScript)
  }
})
