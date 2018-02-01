'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const ingEvents = require('./ingredients/events')
const octicons = require('./octicons/add-octicons')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  authEvents.addHandlers()
  ingEvents.addHandlers()
  octicons.addIcons()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
