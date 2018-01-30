// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')
const apiIngredients = require('../ingredients/api')
const uiIngredients = require('../ingredients/ui')

const signUpSuccess = function (data) {
  store.user = data.user
  console.log('sign up success! store.user is:', store.user)

  // sign-up success messaging
  $('#sign-up-msg').html('Account Created! Please Sign In!')
  $('#sign-up-msg').css('padding', '10px')
  $('#sign-up-msg').css('color', '#0f0')
  $('#sign-up-msg').css('background', '#444')
  $('#sign-up-msg').css('width', 'fit-content')
  $('#sign-up-msg').css('margin', '0 auto')
  $('#sign-up-msg').css('padding', '5px')

  // reset sign-up form
  $('#sign-up-form').each(function () {
    this.reset()
  })
}

const signUpFailure = function (error) {
  console.log('error occurred! please see below for more details:')
  console.error(error)

  // sign-up failure messaging
  $('#sign-up-msg').html('Error has Occurred. Please try again!')
  $('#sign-up-msg').css('padding', '10px')
  $('#sign-up-msg').css('color', '#f00')
  $('#sign-up-msg').css('background', '#000')
  $('#sign-up-msg').css('width', 'fit-content')
  $('#sign-up-msg').css('margin', '0 auto')
}

const signInSuccess = function (data) {
  store.user = data.user // data is a JSON user object "user" containing key/value pairs of 'id', 'email', and 'token'

  // nav-bar user messaging to contain logged in user's name
  $('#navbar-user-email').html(`Hello, ${store.user.email}!`)
  $('#logged-in-user-email').html(`${store.user.email}`)

  // sign-in success messaging
  $('#sign-in-msg').html('Success! Signing in...')
  $('#sign-in-msg').css('padding', '10px')
  $('#sign-in-msg').css('color', '#0f0')
  $('#sign-in-msg').css('background', '#444')
  $('#sign-in-msg').css('width', 'fit-content')
  $('#sign-in-msg').css('margin', '0 auto')
  $('#sign-in-msg').css('padding', '5px')

  $('#sign-in-dropdown').css('display', 'none') // remove sign-in dropdown
  $('.account-nav').css('display', 'inline') // show account-nav dropdown
  $('#sign-in-form').each(function () { // reset sign-in form
    this.reset()
  })

  // make create-ingredient form, fridge, and update-ingredient form appear
  setTimeout(function () { $('.create-ingredient-test-container').css('display', 'inline-block') }, 1000)
  setTimeout(function () { $('#fridge').css('display', 'inline-block') }, 1250)
  setTimeout(function () { $('#update-ingredient-container').css('display', 'inline-block') }, 1500)

  // handlebars template to get user's ingredients
  apiIngredients.getIngredients()
    .then(uiIngredients.getIngsSuccess)
    .catch(uiIngredients.getIngsFailure)
}

const signInFailure = function (error) {
  console.log('error occurred! please see below for more details:')
  console.error(error)

  // sign-in failure messsaging
  $('#sign-in-msg').html('Error has Occurred. Please try again!')
  $('#sign-in-msg').css('padding', '10px')
  $('#sign-in-msg').css('color', '#f00')
  $('#sign-in-msg').css('background', '#000')
  $('#sign-in-msg').css('width', 'fit-content')
  $('#sign-in-msg').css('margin', '0 auto')

  // reset sign-in form
  $('#sign-in-form').each(function () {
    this.reset()
  })
}

const signOutSuccess = function (data) {
  store.user = null
  $('#logged-in-dropdown').css('display', 'none')
  $('#navbar-user-email').html(`SIGNED OUT. Goodbye!`)
  $('#logged-in-user-email').html(`SIGNED OUT`)
  $('.account-nav').css('display', 'none')
  $('#sign-in-msg').html('')
  $('#sign-in-msg').css('display', 'none')
  $('#sign-in-dropdown').css('display', 'inline-block')
  $('.create-ingredient-test-container').css('display', 'none')
  $('#fridge-contents').children('ul').remove()
  $('#fridge').css('display', 'none')
}

const signOutFailure = function (error) {
  console.log('ERROR has occured! please see below')
  console.error(error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
}
