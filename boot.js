
function splashScreen() {
  return [
    " ____            _  ____   _____ ",
    "|  _ \\          | |/ __ \\ / ____|",
    "| |_) | __ _  __| | |  | | (___  ",
    "|  _ < / _` |/ _` | |  | |\\___ \\ ",
    "| |_) | (_| | (_| | |__| |____) |",
    "|____/ \\__,_|\\__,_|\\____/|_____/ ",
    "================================================================================",
    "Starting up..."
  ]
}

render(splashScreen())

onMessage(function(event) {
  render(['key pressed: ' + event.data])
})
