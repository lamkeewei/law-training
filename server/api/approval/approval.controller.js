'use strict';

var _ = require('lodash');
var Approval = require('./approval.model');
var mailer = require('./../../components/mailer/mailer');

// Get list of approvals
exports.index = function(req, res) {
  Approval.find()
    .populate('companyId')
    .exec(function (err, approvals) {
    if(err) { return handleError(res, err); }
    return res.json(200, approvals);
  });
};

// Get a single approval
exports.show = function(req, res) {
  Approval.findById(req.params.id)
    .populate('companyId')
    .exec(function (err, approval) {
      if(err) { return handleError(res, err); }
      if(!approval) { return res.send(404); }
      return res.json(approval);
    });
};

// Creates a new approval in the DB.
exports.create = function(req, res) {
  Approval.create(req.body, function(err, approval) {
    if(err) { return handleError(res, err); }
    var email = approval.email;
    var name = approval.studentName;
    var id = approval._id;

    mailer.sendConfirmEmail(email, name, id, function(err){
      if (err) {
        console.log('ID:', id, 'Email sent error');
      } else {
        console.log('ID:', id, 'Email sent successful');
      }
    });

    mailer.sendAdminEmail(name, function(err){
      if (err) {
        console.log('ID:', id, 'Email sent error');
      } else {
        console.log('ID:', id, 'Email sent successful');
      }
    });

    return res.json(201, approval);
  });
};

// Updates an existing approval in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Approval.findById(req.params.id, function (err, approval) {
    if (err) { return handleError(res, err); }
    if(!approval) { return res.send(404); }
    var updated = _.merge(approval, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      var email = updated.email;
      var name = updated.studentName;
      var id = updated._id;
      var status = updated.status;

      mailer.sendUpdateEmail(email, name, id, status, function(err){
        if (err) {
          console.log('ID:', id, 'Email sent error');
        } else {
          console.log('ID:', id, 'Email sent successful');
        }
      });

      return res.json(200, approval);
    });
  });
};

// Deletes a approval from the DB.
exports.destroy = function(req, res) {
  Approval.findById(req.params.id, function (err, approval) {
    if(err) { return handleError(res, err); }
    if(!approval) { return res.send(404); }
    approval.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}