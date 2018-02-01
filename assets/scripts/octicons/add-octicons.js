'use strict'

const octicons = require('octicons')

$('#octicon-github').html(octicons.github)

const addIcons = function () {
  $('#octicon-github').html(octicons.logo-github)
}

module.export = {
  addIcons
}
