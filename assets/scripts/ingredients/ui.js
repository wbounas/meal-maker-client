// instruct browser to use Strict mode, a reduced and safer feature set of JS
'use strict'

const store = require('../store')
const showIngsTemplate = require('../templates/ing-listing.handlebars')
const modalMaker = require('../templates/modal-maker.handlebars')
const api = require('./api')

const createIngredientSuccess = function (data) {
  // console.log('it worked! data inside of createIngredientSuccess is:', data)
  // const showIngHtml = showIngTemplate({ ingredient: data.ingredient }) // data is the return from the API call
  // $('#fridge').append(showIngHtml)

  // reset create-ingredient form
  $('#create-ingredient-test').each(function () {
    this.reset()
  })

  // create-ingredient success messaging
  $('.create-ing-msg').text('')
  $('.create-ing-msg').css('display', 'block')
  $('.create-ing-msg').text('Ingredient created, and added to your fridge!')
  $('.create-ing-msg').css('padding', '10px')
  $('.create-ing-msg').css('margin-bottom', '10px')
  $('.create-ing-msg').css('color', '#0f0')
  $('.create-ing-msg').css('background', '#444')
  $('.create-ing-msg').css('width', 'fit-content')
  $('.create-ing-msg').css('margin', '0 auto')
  setTimeout(function () { $('.create-ing-msg').css('display', 'static') }, 3500)
  setTimeout(function () { $('.create-ing-msg').css('background', '#fff') }, 3500)
  setTimeout(function () { $('.create-ing-msg').css('color', '#000') }, 3500)
  setTimeout(function () { $('.create-ing-msg').html('') }, 3500)

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

  // create-ingredient failure messaging
  $('.create-ing-msg').css('display', 'block')
  $('.create-ing-msg').html('ERROR: Each Ingredient requires a name, unit, and quantity.')
  $('.create-ing-msg').css('padding', '10px')
  $('.create-ing-msg').css('color', '#f00')
  $('.create-ing-msg').css('background', '#000')
  $('.create-ing-msg').css('width', 'fit-content')
  $('.create-ing-msg').css('margin', '0 auto')
  setTimeout(function () { $('.create-ing-msg').css('display', 'none') }, 3500)
  setTimeout(function () { $('.create-ing-msg').html('') }, 3500)
}

const deleteIngredientSuccess = function (button) {
  // remove the <ul> from handlebars that contains the ingredient whose child had the remove button
  $(button).parents('tr').empty()
}

const deleteIngredientFailure = function (error) {
  console.log('ERROR has occurred, please see below')
  console.error(error)
}

const getIngsSuccess = function (data) {
  // console.log('GET ingredients worked! data is:', data)
  store.ingredients = data.ingredients // data is a JSON array containing all ingredients for that user
  // $('#fridge-contents').emtpy()
  console.log('store.ingredients is:', store.ingredients.length)
  const showIngsHtml = showIngsTemplate({ ingredients: data.ingredients })
  const makeModal = modalMaker({ ingredients: data.ingredients })

  const checkStoreIngredientsEmpty = function (storedIngredients) {
    if (storedIngredients.length >= 1) {
      return false
    } else {
      return true
    }
  }

  if (checkStoreIngredientsEmpty(store.ingredients)) {
    $('.create-ing-msg').text('To start, try adding an ingredient you know you have at home in your Meal[Maker] fridge!')
  }

  $('#fridge-contents').append(showIngsHtml)
  $('#fridge-contents').append(makeModal)
  $('#fridge-contents').css('overflow-y', 'auto')
  $('.update-ingredient-container').css('display', 'inline-block')
  $('.update-ingredient-container').css('overflow', 'auto')
}

const getIngsFailure = function (error) {
  console.log('ERROR please see below')
  console.error(error)
}

const updateIngredientSuccess = function (data) {
  console.log('PATCH ingredient worked! data is:', data)
  const ingID = data.id

  // update-ingredient success messaging
  $('#update-ing-msg').html('Ingredient Updated!')
  $('#update-ing-msg').css('padding', '10px')
  $('#update-ing-msg').css('margin-bottom', '10px')
  $('#update-ing-msg').css('color', '#0f0')
  $('#update-ing-msg').css('background', '#444')
  $('#update-ing-msg').css('width', 'fit-content')
  $('#update-ing-msg').css('margin', '0 auto')

  // clear update-fridge form
  // // reset sign-in form
  // $('#update-ingredient-form').get(0).reset()

  $('#fridge-contents').css('overflow-y', 'auto')

  $('.update-ingredient-container').css('display', 'inline-block')

  console.log('inside of update success, this is:', $(this).parents())
  $('#' + ingID).modal('hide')
  // $('.modal-backdrop fade in').css('display', 'none')
  // $('body').removeClass('modal-open')

  // empty out fridge, and re-stock with newly updated ingredient included
  $('#fridge-contents').empty()
  const makeModal = modalMaker({ ingredients: data.ingredients })
  $('#fridge-contents').append(makeModal)
  $('body').attr('class', 'container-fluid') // if this works, this is the $$$

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
  $('.create-ing-msg').css('margin-bottom', '10px')
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
