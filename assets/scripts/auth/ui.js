// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  store.user = data.user
  console.log('sign up success! store.user is:', store.user)
  $('#navbar-user-email').html(`${store.user.email}`)
}

const signUpFailure = function (error) {
  console.log('error occurred! please see below for more details:')
  console.error(error)
  $('#sign-up-test').each(function () {
    this.reset()
  })
}

const signInSuccess = function (data) {
  store.user = data.user
  console.log('sign in success! store.user is:', store.user)
  $('#navbar-user-email').html(`${store.user.email}`)
  $('#sign-in-form').each(function () {
    this.reset()
  })
}

const signInFailure = function (error) {
  console.log('error occurred! please see below for more details:')
  console.error(error)
  $('#sign-in-form').each(function () {
    this.reset()
  })
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
}
