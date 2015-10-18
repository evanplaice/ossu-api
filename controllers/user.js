'use strict';

// load deps

/**
 *
 * Return all functions in CRUD for Users
 *
 */

// Using the Clojure to load the database and the specific model;
var Model;

var UserController = function (db) {
  Model = db.User;

  UserController.prototype.create = (req, res) => {
    Model.create(req.body, (err, user) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(user);
    });
  };

  UserController.prototype.show = (req, res) => {
    Model.find({}, (err, users) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    });
  };

  UserController.prototype.get = (req, res) => {
    Model.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      console.log('this shouldnt execute');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user);
    });
  };

  UserController.prototype.update = (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(user);
    });
  };

  UserController.prototype.destroy = (req, res) => {
    Model.remove(req.params.id, (err) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      // TODO: verify the record is destroyed?
      res.status(204);
    });
  };
};

module.exports = UserController;
