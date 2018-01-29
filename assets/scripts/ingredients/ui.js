// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')
const showIngsTemplate = require('../templates/ing-listing.handlebars')

const createIngredientSuccess = function () {
  console.log('it worked!')
}

const createIngredientFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

const removeIngredientSuccess = function (data) {
  $(data).parents('ul').empty()
}

const removeIngredientFailure = function (error) {
  console.log('ERROR has occurred, please see below')
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
  createIngredientSuccess,
  createIngredientFailure,
  removeIngredientSuccess,
  removeIngredientFailure,
  getIngsSuccess,
  getIngsFailure
}
