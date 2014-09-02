'use strict';

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'smu.thebar@gmail.com',
    pass: 'administhebest@454'
  }
});

var sendConfirmEmail = function(email, name, id, cb){
  var url = "https://internship-db.herokuapp.com/approvals/status/" + id;
  transporter.sendMail({
    from: 'The Bar <smu.thebar@gmail.com>',
    to: email,
    subject: 'Your Internship Request Has Been Sent',
    html: '<h3>Hello ' + name + ',</h3>Your internship request has been sent! <br><br> You can track its status <a href="' + url + '">here</a>.'
  }, cb);
};

var sendUpdateEmail = function(email, name, id, status, cb){
  var url = "https://internship-db.herokuapp.com/approvals/status/" + id;
  transporter.sendMail({
    from: 'The Bar <smu.thebar@gmail.com>',
    to: email,
    subject: 'Your Internship Request is ' + status,
    html: '<h3>Hello ' + name + ',</h3>Your internship request has been <strong>' + status.toLowerCase() + '</strong>! <br><br> You can view its details <a href="' + url + '">here</a>.'
  }, cb);
};

var sendAdminEmail = function(name, cb){
  transporter.sendMail({
    from: 'The Bar <smu.thebar@gmail.com>',
    to: 'llbinternships@smu.edu.sg, smu.thebar@gmail.com',
    subject: 'A new internship request has been submitted by ' + name,
    html: '<h3>Hello</h3><p>Please login <a href="https://internship-db.herokuapp.com/login">here</a> to approve or reject it.</p>'
  }, cb);
};

module.exports.sendConfirmEmail = sendConfirmEmail;
module.exports.sendUpdateEmail = sendUpdateEmail;
module.exports.sendAdminEmail = sendAdminEmail;
