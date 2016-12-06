inject('peripheralsBus', ({Bus, window, motherboard}) => {
  return Bus(window, motherboard.contentWindow)
})
