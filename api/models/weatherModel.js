'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Medition = new Schema({
  temperature: {
    type: Number
  },
  humidity: {
    type: Number
  },
  meditionTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Medition', Medition);
