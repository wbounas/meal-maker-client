// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  store.user = data.user
  console.log('sign up success! store.user is:', store.user)
  $('#navbar-user-email').html(`${store.user.email}`)
}

const signUpFailure = function () {
  $('#sign-up-test').each(function () {
    this.reset()
  })
}

module.exports = {
  signUpSuccess,
  signUpFailure
}
