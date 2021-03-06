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

// send PATCH to /change-password/:id
const changePassword = function (data) {
  // // console.log(data)
  // // console.log('When trying to Change Password, the data in "store" is:', store)
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// send DELETE to /sign-out/:id
const signOut = function (data) {
  // // console.log('store.user.token before signOut is:', store.user.token)
  return $.ajax({
    url: config.apiOrigin + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
