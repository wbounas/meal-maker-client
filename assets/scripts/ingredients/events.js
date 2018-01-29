// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateIngredient = function (event) {
  const data = getFormFields(this) // data becomes a JSON object "ingredient" with key/value pairs based on the 'name' of each field in the form e.g. ingredient[form-field-name]
  // console.log('this worked? data is:', data)
  event.preventDefault()
  api.createIngredient(data) // pass in 'data', or in this case a JSON object "ingredient" to API call
    .then(ui.createIngredientSuccess)
    .catch(ui.createIngredientFailure)
}

const onDeleteIngredient = function (event) {
  event.preventDefault()
  const data = $(this).parents('ul').data('id') // this is the ingredient's ID based on the data-id of the parent <ul> from handlebars
  const fridgeRemoveBtn = event.target // event.target is the button
  api.deleteIngredient(data)
    .then(ui.deleteIngredientSuccess(fridgeRemoveBtn))
    .catch(ui.deleteIngredientFailure)
}

const onUpdateIngredient = function (event) {
  console.log('update ingredient button worked!')
  const data = getFormFields(this)
  const ingID = $('#update-ing').parents('ul').data('id')
  console.log('ingID is:', ingID)
  event.preventDefault()
  api.updateIngredient(data, ingID)
    .then(ui.updateIngredientSuccess)
    .catch(ui.updateIngredientFailure)
}

const addHandlers = function () {
  $('#create-ingredient-test').on('submit', onCreateIngredient)
  $('#update-ingredient-form').on('submit', onUpdateIngredient)
  $('body').on('click', '#remove-ing', onDeleteIngredient)
}

module.exports = {
  addHandlers
}
