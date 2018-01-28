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

module.exports = {
  createIngredient
}
