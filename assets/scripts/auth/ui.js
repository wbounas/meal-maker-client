// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const api = require('./api')
const store = require('../store')
const showIngsTemplate = require('../templates/ing-listing.handlebars')


const signUpSuccess = function (data) {
  store.user = data.user
  console.log('sign up success! store.user is:', store.user)
  $('#navbar-user-email').html(`${store.user.email}`)
  $('#logged-in-user-email').html(`${store.user.email}`)
  $('#sign-up-test').each(function () {
    this.reset()
  })
}

const signUpFailure = function (error) {
  console.log('error occurred! please see below for more details:')
  console.error(error)
}

const signInSuccess = function (data) {
  store.user = data.user
  console.log('sign in success! store.user is:', store.user)
  console.log('data.ingredients is:', data.ingredients)
  $('#navbar-user-email').html(`${store.user.email}`)
  $('#logged-in-user-email').html(`${store.user.email}`)
  $('#sign-in-dropdown').css('display', 'none')
  $('.account-nav').css('display', 'inline')
  $('#sign-in-form').each(function () {
    this.reset()
  })
  setTimeout(function () { $('.create-ingredient-test-container').css('display', 'inline-block') }, 1000)
  setTimeout(function () { $('#fridge').css('display', 'inline-block') }, 1250)
  // handlebars template to get user's books
  api.getIngs()
    .then(getIngsSuccess)
    .catch(getIngsFailure)
}

const signInFailure = function (error) {
  console.log('error occurred! please see below for more details:')
  console.error(error)
  $('#sign-in-form').each(function () {
    this.reset()
  })
}

const signOutSuccess = function (data) {
  store.user = null
  $('#logged-in-dropdown').css('display', 'none')
  $('#navbar-user-email').html(`SIGNED OUT - TEST - `)
  $('#logged-in-user-email').html(`SIGNED OUT - TEST -`)
  $('.account-nav').css('display', 'none')
  $('#sign-in-dropdown').css('display', 'inline-block')
  $('.create-ingredient-test-container').css('display', 'none')
  $('#fridge').css('display', 'none')
}

const signOutFailure = function (error) {
  console.log('ERROR has occured! please see below')
  console.error(error)
}

const getIngsSuccess = function (data) {
  console.log('GET ingredients worked! data is:', data)
  store.ingredients = data.ingredients
  const showIngsHtml = showIngsTemplate({ ingredients: data.ingredients })
  $('#fridge').append(showIngsHtml)
}

const getIngsFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  getIngsSuccess,
  getIngsFailure
}
