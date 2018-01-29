// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')
const showIngTemplate = require('../templates/add-ing-listing.handlebars')
const showIngsTemplate = require('../templates/ing-listing.handlebars')

const createIngredientSuccess = function (data) {
  // console.log('it worked! data inside of createIngredientSuccess is:', data)
  const showIngHtml = showIngTemplate({ ingredient: data.ingredient }) // data is the return from the API call
  $('#fridge').append(showIngHtml)
  $('#create-ingredient-test').each(function () {
    this.reset()
  })
}

const createIngredientFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

const deleteIngredientSuccess = function (fridgeRemoveButton) {
  $(fridgeRemoveButton).parents('ul').empty()
}

const deleteIngredientFailure = function (error) {
  console.log('ERROR has occurred, please see below')
  console.error(error)
}

const getIngsSuccess = function (data) {
  // console.log('GET ingredients worked! data is:', data)
  store.ingredients = data.ingredients // data is a JSON array containing all ingredients for that user
  const showIngsHtml = showIngsTemplate({ ingredients: data.ingredients })
  $('#fridge').append(showIngsHtml)
}

const getIngsFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

const updateIngredientSuccess = function (data) {
  console.log('PATCH ingredient worked! data is:', data)
}

const updateIngredientFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
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
