// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const config = require('../config')
const store = require('../store')

// send POST to /sign-up
const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

// send POST to /sign-in
const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp,
  signIn
}
