'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListingSchema = new Schema({
  name: String,
  contact: String,
  type: String,
  deadline: Date,
  additionalInfo: String,
  period: [{
    start: Date,
    end: Date
  }],
  practiceAreas: [String]
});

module.exports = mongoose.model('Listing', ListingSchema);