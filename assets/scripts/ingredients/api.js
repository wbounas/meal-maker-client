// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const config = require('../config')
const store = require('../store')

// send POST to /ingredients
const createIngredient = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/ingredients',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteIngredient = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/ingredients/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// send GET to /ingredients?user_id=:id
const getIngredients = function () {
  return $.ajax({
    url: config.apiOrigin + '/ingredients?user_id=' + store.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createIngredient,
  deleteIngredient,
  getIngredients
}
