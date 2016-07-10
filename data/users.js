'use strict';

const bcrypt = require('bcrypt-nodejs'),
  Boom = require('boom'),
  User = require('../models/user');

const users = {},
  saltRounds = 10;

function createUser (username, passwordString, callback) {
  if (users[username]) {
    throw Boom.conflict('Username already exists');
  }
  hashPassword(passwordString, (err, passwordHash) => {
    let user = new User(username, passwordHash);
    users[username] = user;
    callback(null, user);
  });
};

function getUser (username, callback) {
  callback(null, users[username]);
};

function authenticateUser (username, passwordString, callback) {
  getUser(username, (err, user) => {
    if (err || !user) callback('User not found');
    else validatePassword(passwordString, user.passwordHash, (err, res) => {
      callback(err, res, res ? user : null);
    });
  });
};

function validatePassword (passwordString, passwordHash, callback) {
  bcrypt.compare(passwordString, passwordHash, (err, res) => {
    callback(err, res);
  });
}

function hashPassword (passwordString, callback) {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) callback(err);
    else bcrypt.hash(passwordString, salt, null, (err, hash) => {
      callback(err, hash);
    });
  });
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.authenticateUser = authenticateUser;
