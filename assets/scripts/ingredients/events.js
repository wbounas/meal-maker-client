// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateIngredient = function () {
  const data = getFormFields(this)
  console.log('this worked? data is:', data)
  event.preventDefault()
  api.createIngredient(data)
    .then(ui.createIngredientSuccess)
    .catch(ui.createIngredientFailure)
}

const addHandlers = function () {
  $('#create-ingredient-test').on('submit', onCreateIngredient)
}

module.exports = {
  addHandlers
}
