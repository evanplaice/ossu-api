/*global describe it xit before */
'use strict';

let assert = require('chai').assert;

module.exports = (db) => {
  describe('User Model', () => {
    let UserModel = db.model('user');

    before((done) => {
      UserModel.remove(() => {
        done();
      });
    });

    it('saves without error', (done) => {
      let user = new UserModel({
        fname: 'John',
        lname: 'Doe'
      });

      user.save((err, model) => {
        assert.isNull(err);
        assert.isDefined(model._id);
        done();
      });
    });
  });

  describe('Course Model', () => {
    let CourseModel = db.model('course');

    before((done) => {
      CourseModel.remove(() => {
        done();
      });
    });

    it('saves without error', (done) => {
      let course = new CourseModel({
        name: 'Underwater Basket Weaving',
        school: 'Harvard',
        duration: '4 Years',
        time: '40 hours/week',
        hostaddr: 'http://www.google.com'
      });

      course.save((err, model) => {
        assert.isNull(err);
        assert.isDefined(model._id);
        done();
      });
    });
  });

  describe('Curriculum Model', () => {
    let CurrModel = db.model('curriculum');

    before((done) => {
      CurrModel.remove(() => {
        done();
      });
    });

    it('saves without error', (done) => {
      let course = new CurrModel({
        name: 'Master Brewer'
      });

      course.save((err, model) => {
        assert.isNull(err);
        assert.isDefined(model._id);
        done();
      });
    });

    xit('organizes courses into categories');
  });
};
