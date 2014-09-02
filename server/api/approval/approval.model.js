'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApprovalSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Listing' },
  studentId: String,
  studentName: String,
  email: String,
  supervisor: String,
  start: Date,
  end: Date,
  description: String,
  reason: String,
  status: {type: String, default: 'Pending'}
});

module.exports = mongoose.model('Approval', ApprovalSchema);