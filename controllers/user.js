'use strict';

// load deps

/**
 *
 * Return all functions in CRUD for Users
 *
 */

// Using the Clojure to load the database and the specific model;
var Model;
// var database;

var UserController = function (db) {
  // database = db;
  Model = db.User;
};

module.exports = UserController;

UserController.prototype.create = (req, res) => {
  res.status(200).send('ok');
};

UserController.prototype.show = (req, res) => {
  Model.find({}, (err, users) => {
    if (err) {
      res.status(400).send(err);
    }

    res.status(200).send(users);
  });
};

UserController.prototype.get = (req, res) => {
  res.status(200).send('ok');
};

UserController.prototype.update = (req, res) => {
  res.status(200).send('ok');
};

UserController.prototype.destroy = (req, res) => {
  res.status(200).send('ok');
};

