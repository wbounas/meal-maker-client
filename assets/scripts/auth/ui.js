// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')
const apiIngredients = require('../ingredients/api')
const uiIngredients = require('../ingredients/ui')

const signUpSuccess = function (data) {
  store.user = data.user
  console.log('sign up success! store.user is:', store.user)

  // sign-up success messaging
  $('#sign-up-msg').css('display', 'block')
  $('#sign-up-msg').html('Account Created! Please Sign In!')
  $('#sign-up-msg').css('padding', '10px')
  $('#sign-up-msg').css('margin-bottom', '10px')
  $('#sign-up-msg').css('color', '#0f0')
  $('#sign-up-msg').css('background', '#444')
  $('#sign-up-msg').css('width', 'fit-content')
  $('#sign-up-msg').css('margin', '0 auto')
  setTimeout(function () { $('#sign-up-msg').css('display', 'none') }, 7000)
  setTimeout(function () { $('#sign-up-msg').html('') }, 7000)

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
  $('#sign-up-msg').css('margin-bottom', '10px')
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

  // sign-in success ui messaging
  $('.sign-in-msg').css('display', 'block')
  $('.sign-in-msg').html('Success! Signing in...')
  $('.sign-in-msg').css('padding', '10px')
  $('.sign-in-msg').css('margin-bottom', '10px')
  $('.sign-in-msg').css('color', '#0f0')
  $('.sign-in-msg').css('background', '#444')
  $('.sign-in-msg').css('width', 'fit-content')
  $('.sign-in-msg').css('margin', '0 auto')

  setTimeout(function () { $('.jumbotron').css('display', 'none') }, 1000)
  setTimeout(function () { $('#sign-in-dropdown').css('display', 'none') }, 2000) // remove sign-in dropdown after 2000 ml-sec
  setTimeout(function () { $('#logged-in-dropdown').css('display', 'inline-block') }, 2000) // show account-nav dropdown after 2000 ml-sec
  setTimeout(function () { $('.account-nav').css('display', 'block') }, 2000)
  setTimeout(function () { $('.sign-in-msg').css('display', 'none') }, 3500) // set display: none; for ui messaging
  setTimeout(function () { $('.sign-in-msg').html('') }, 3500) // remove html content from ui messaging

  $('#sign-in-form').each(function () { // reset sign-in form
    this.reset()
  })

  // make create-ingredient form, fridge, and update-ingredient form appear
  setTimeout(function () { $('.create-ingredient-test-container').css('display', 'inline-block') }, 1000)
  setTimeout(function () { $('#fridge').css('display', 'inline-block') }, 1250)
  setTimeout(function () { $('.update-ingredient-container').css('display', 'inline-block') }, 1500)

  // call API, if successful, use handlebars template to render user's ingredients in HTML
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
  $('#sign-in-msg').css('margin-bottom', '10px')
  $('#sign-in-msg').css('color', '#f00')
  $('#sign-in-msg').css('background', '#000')
  $('#sign-in-msg').css('width', 'fit-content')
  $('#sign-in-msg').css('margin', '0 auto')

  // reset sign-in form
  $('#sign-in-form').each(function () {
    this.reset()
  })
}

const changePasswordSuccess = function (data) {
  // console.log below will return UNDEFINED
  // console.log('Change Password Successful! Data is:', data)
  $('.account-nav-msg').css('display', 'block')
  $('.account-nav-msg').html('Changed Password Successfully!')
  $('.account-nav-msg').css('padding', '10px')
  $('.account-nav-msg').css('margin-bottom', '10px')
  $('.account-nav-msg').css('color', '#0f0')
  $('.account-nav-msg').css('background', '#444')
  $('.account-nav-msg').css('width', 'fit-content')
  $('.account-nav-msg').css('margin', '0 auto')
  $('#change-password').each(function () {
    this.reset()
  })
  setTimeout(function () { $('.account-nav-msg').css('display', 'none') }, 3500)
  setTimeout(function () { $('.account-nav-msg').html('') }, 3500)
}

const changePasswordFailure = function (error) {
  console.error(error)
  $('.account-nav-msg').css('display', 'block')
  $('.account-nav-msg').html('ERROR: Check passwords and try again!')
  $('.account-nav-msg').css('padding', '10px')
  $('.account-nav-msg').css('margin-bottom', '10px')
  $('.account-nav-msg').css('color', '#f00')
  $('.account-nav-msg').css('background', '#444')
  $('.account-nav-msg').css('width', 'fit-content')
  $('.account-nav-msg').css('margin', '0 auto')
  $('#change-password').each(function () {
    this.reset()
  })
  setTimeout(function () { $('.account-nav-msg').css('display', 'none') }, 7000)
  setTimeout(function () { $('.account-nav-msg').html('') }, 7000)
}

const signOutSuccess = function (data) {
  store.user = null // clear stored user
  $('#fridge-contents').empty() // remove #fridge-contents element from the dom, plus its content

  $('.account-nav-msg').css('display', 'block')
  $('.account-nav-msg').html('Goodbye!')
  $('.account-nav-msg').css('padding', '10px')
  $('.account-nav-msg').css('margin-bottom', '10px')
  $('.account-nav-msg').css('color', '#0f0')
  $('.account-nav-msg').css('background', '#444')
  $('.account-nav-msg').css('width', 'fit-content')
  $('.account-nav-msg').css('margin', '0 auto')
  $('#change-password').each(function () {
    this.reset()
  })

  // // remove :user-owned resources, create-ingredient form (slightly before auth ui finishes)
  // setTimeout(function () { $('.create-ingredient-test-container').css('display', 'none') }, 100) // remove form for create-ingredient
  // setTimeout(function () { $('#fridge').css('display', 'none') }, 100) // remove #fridge div

  $('.create-ingredient-test-container').css('display', 'none')
  $('#fridge').css('display', 'none')

  // navbar dropdown context-changes
  $('.logged-in-dropdown').css('display', 'none') // remove logged-in dropdown
  $('.account-nav').css('display', 'none') // remove signed-in dropdown ui
  $('#sign-in-dropdown').css('display', 'inline-block') // show drop down for sign-in

  // ui messaging
  setTimeout(function () { $('#navbar-user-email').html(`SIGNED OUT. Goodbye!`) }, 250) // set navbar-msg after 2000 ml-sec
  setTimeout(function () { $('#logged-in-user-email').html(`SIGNED OUT`) }, 250) // set navbar-msg after 2000 ml-sec
  setTimeout(function () { $('#sign-in-msg').html('') }, 2000) // clear sign-in ui messaging
  setTimeout(function () { $('#sign-in-msg').css('display', 'none') }, 2000) // remove sign-in ui messaging
  setTimeout(function () { $('.account-nav-msg').css('display', 'none') }, 1000) // set display: none; for ui messaging
  setTimeout(function () { $('.account-nav-msg').html('') }, 3500) // remove html content from ui messaging

  $('.jumbotron').css('display', 'block')
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
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
