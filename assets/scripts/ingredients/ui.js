// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')
const showIngTemplate = require('../templates/add-ing-listing.handlebars')
const showIngsTemplate = require('../templates/ing-listing.handlebars')
const api = require('./api')

const createIngredientSuccess = function (data) {
  // console.log('it worked! data inside of createIngredientSuccess is:', data)
  // const showIngHtml = showIngTemplate({ ingredient: data.ingredient }) // data is the return from the API call
  // $('#fridge').append(showIngHtml)

  // reset create-ingredient form
  $('#create-ingredient-test').each(function () {
    this.reset()
  })

  // empty the contents of the fridge
  $('#fridge-contents').empty()

  // repopulate the fridge with user's ingredients
  api.getIngredients()
    .then(getIngsSuccess)
    .catch(getIngsFailure)
}

const createIngredientFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

const deleteIngredientSuccess = function (button) {
  // remove the <ul> from handlebars that contains the ingredient whose child had the remove button
  $(button).parents('ul').empty()
}

const deleteIngredientFailure = function (error) {
  console.log('ERROR has occurred, please see below')
  console.error(error)
}

const getIngsSuccess = function (data) {
  console.log('GET ingredients worked! data is:', data)
  store.ingredients = data.ingredients // data is a JSON array containing all ingredients for that user
  const showIngsHtml = showIngsTemplate({ ingredients: data.ingredients })
  $('#fridge-contents').append(showIngsHtml)
}

const getIngsFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

const updateIngredientSuccess = function (data) {
  console.log('PATCH ingredient worked! data is:', data)

  // update-ingredient success messaging
  $('#update-ing-msg').html('Ingredient Updated!')
  $('#update-ing-msg').css('padding', '10px')
  $('#update-ing-msg').css('color', '#0f0')
  $('#update-ing-msg').css('background', '#444')
  $('#update-ing-msg').css('width', 'fit-content')
  $('#update-ing-msg').css('margin', '0 auto')
  $('#update-ing-msg').css('padding', '5px')

  // clear update-fridge form
  // reset sign-in form
  $('#update-ingredient-form').each(function () {
    this.reset()
  })

  // empty out fridge, and re-stock with newly updated ingredient included
  $('#fridge-contents').empty()

  api.getIngredients()
    .then(getIngsSuccess)
    .catch(getIngsFailure)
}

const updateIngredientFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)

  // create-ingredient failure messsaging
  $('#update-ing-msg').html('Error has Occurred. Please try again!')
  $('#update-ing-msg').css('padding', '10px')
  $('#update-ing-msg').css('color', '#f00')
  $('#update-ing-msg').css('background', '#000')
  $('#update-ing-msg').css('width', 'fit-content')
  $('#update-ing-msg').css('margin', '0 auto')
}

module.exports = {
  createIngredientSuccess,
  createIngredientFailure,
  deleteIngredientSuccess,
  deleteIngredientFailure,
  getIngsSuccess,
  getIngsFailure,
  updateIngredientSuccess,
  updateIngredientFailure
}
