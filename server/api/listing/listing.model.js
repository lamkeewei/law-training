'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListingSchema = new Schema({
  name: String,
  contact: String,
  additionalInfo: String,
  application: [{
    start: Date,
    end: Date
  }],
  interview: [{
    start: Date,
    end: Date
  }],
  practiceAreas: [String]
});

module.exports = mongoose.model('Listing', ListingSchema);