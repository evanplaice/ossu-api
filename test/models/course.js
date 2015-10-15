/*global describe it before */
'use strict';

let expect = require('chai').expect;

module.exports = (db) => {
  describe('Course Model', () => {
    let Model = db.Course;

    before((done) => {
      Model.remove(() => {
        done();
      });
    });

    it('saves without error', (done) => {
      let course = new Model({
        name: 'Underwater Basket Weaving',
        school: 'Harvard',
        duration: '4 Years',
        time: '40 hours/week',
        hostaddr: 'http://www.google.com'
      });

      course.save((err, model) => {
        expect(err).to.be.null;
        expect(model).to.not.be.null;
        expect(model).to.have.property('_id');
        expect(model).to.have.property('name', 'Underwater Basket Weaving');
        expect(model).to.have.property('school', 'Harvard');
        expect(model).to.have.property('duration', '4 Years');
        expect(model).to.have.property('time', '40 hours/week');
        expect(model).to.have.property('hostaddr', 'http://www.google.com');
        done();
      });
    });
  });
};
