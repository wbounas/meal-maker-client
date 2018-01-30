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
  console.log('in onDeleteIngredient, this is:', this) // 'this' is the button itself
  const data = $(this).parents('ul').data('id') // this is the ingredient's ID based on the data-id of the parent <ul> from handlebars
  const fridgeRemoveBtn = event.target // event.target is the button
  api.deleteIngredient(data) // hit API for DELETE request
    .then(ui.deleteIngredientSuccess(fridgeRemoveBtn)) // if successful, empty parents of button
    .catch(ui.deleteIngredientFailure)
}

// const onUpdateIngredient = function () {
//   console.log('update ingredient button worked!')
//   const data = getFormFields(this)
//   const ingUpdateBtn = event.target
//   event.preventDefault()
//   api.updateIngredient(data, ingID)
//     .then(ui.updateIngredientSuccess(data, ingUpdateBtn))
//     .catch(ui.updateIngredientFailure)
// }

const getUpdateItemInfo = function (event) {
  const ingID = $(this).parents('ul').data('id') // gives you ingredient.id of parent <ul> to update-btn
  const ingNAME = $(this).siblings('.name').data('name') // gives you ingredient.name
  const ingUNIT = $(this).siblings('.unit').data('unit') // gives you ingredient.unit
  const ingQUANTITY = $(this).siblings('.quantity').data('quantity') // gives you ingredient.quantity
  const ingNOTES = $(this).siblings('.notes').data('notes') // gives you ingredient.notes
  console.log('inside getUpdateItemInfo, ingID is:', ingID)
  console.log('inside getUpdateItemInfo, ingNAME is', ingNAME)
  console.log('inside getUpdateItemInfo, ingUNIT is', ingUNIT)
  console.log('inside getUpdateItemInfo, ingQUANTITY is', ingQUANTITY)
  console.log('inside getUpdateItemInfo, ingNOTES is', ingNOTES)
  console.log('update ingredient button worked!')

  const onSubmitUpdateIngredient = function (event) {
    const data = getFormFields(this)
    event.preventDefault()
    api.updateIngredient(data, ingID)
      .then(ui.updateIngredientSuccess)
      .catch(ui.updateIngredientFailure)
  }

  $('#update-ingredient-form').on('submit', onSubmitUpdateIngredient)
}

const addHandlers = function () {
  $('#create-ingredient-test').on('submit', onCreateIngredient)
  // $('#update-ingredient-form').on('submit', onUpdateIngredient)
  $('body').on('click', '#update-ing', getUpdateItemInfo)
  $('body').on('click', '#remove-ing', onDeleteIngredient)
}

module.exports = {
  addHandlers
}
