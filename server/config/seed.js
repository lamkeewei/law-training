/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Listing = require('../api/listing/listing.model');

Listing.find({}).remove(function() {
  Listing.create({
    name: 'Rajah and Tann',
    contact: 'admin@admin.com',
    additionalInfo: '<p>test</p>',
    application: [{
      start: new Date(),
      end: new Date()
    }],
    interview: [{
      start: new Date(),
      end: new Date()
    }]
  }, {
    name: 'APAC Law Corporation',
    contact: 'admin@admin.com',
    additionalInfo: '<p>test</p>',
    application: [{
      start: new Date(),
      end: new Date()
    }],
    interview: [{
      start: new Date(),
      end: new Date()
    }],
    practiceAreas: ['Corporate & Commercial', 'Family Law', 'Litigation & Dispute Resolution']
  }, {
    name: 'Bernard & Rada Law Corp',
    contact: 'admin@admin.com',
    application: [{
      start: new Date(),
      end: new Date()
    }],
    interview: [{
      start: new Date(),
      end: new Date()
    }]
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'administhebest@454'
  }, function() {
      console.log('finished populating users');
    }
  );
});