// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const createIngredientSuccess = function () {
  console.log('it worked!')
}

const createIngredientFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

module.exports = {
  createIngredientSuccess,
  createIngredientFailure
}
