// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function () {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('hello world. data is :', data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .then(ui.signUpFailure)
}

const addHandlers = function () {
  $('#sign-up-test').on('submit', onSignUp)
}

module.exports = {
  addHandlers
}
