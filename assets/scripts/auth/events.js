// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function () {
  const data = getFormFields(this)
  event.preventDefault()
  // console.log('hello world. data is :', data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this) // data is stored as a "credentials" JSON array containing 'email' and 'password' key/value pairs
  event.preventDefault()
  // // console.log('hello world! data is:', data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  // console.log('in onSignOut, event is:', event)
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const addHandlers = function () {
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-btn').on('click', onSignOut)
}

module.exports = {
  addHandlers
}
