// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateIngredient = function (event) {
  const data = getFormFields(this)
  // const ingID = data.ingredient.id
  console.log('this worked? data is:', data)
  event.preventDefault()
  api.createIngredient(data)
    .then(ui.createIngredientSuccess)
    .catch(ui.createIngredientFailure)
}

const onRemoveIngredient = function (event) {
  event.preventDefault()
  const data = $(this).parents('ul').data('id')
  const fridgeRemoveBtn = event.target
  console.log('in onRemoveIngredient, data is:', data)
  api.deleteIngredient(data)
    .then(ui.removeIngredientSuccess(fridgeRemoveBtn))
    .catch(ui.removeIngredientFailure)
}

const addHandlers = function () {
  $('#create-ingredient-test').on('submit', onCreateIngredient)
  $('body').on('click', '#remove-ing', onRemoveIngredient)
}

module.exports = {
  addHandlers
}
