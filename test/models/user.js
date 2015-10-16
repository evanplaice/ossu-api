/*global describe it before */
'use strict';

let expect = require('chai').expect;

module.exports = (db) => {
  describe('User Model', () => {
    let Model = db.User;

    before((done) => {
      Model.remove(() => {
        done();
      });
    });

    it('saves without error', (done) => {
      let user = new Model({
        username: 'Marcus Aurelius',
        email: 'marcusaurelius@rome.gov',
        github: {
          nick: '@soicismftw',
          link: 'https://github.com/soicismftw'
        },
        twitter: {
          nick: '@strengthandhonor',
          link: 'https://www.linkedin.com/in/strengthandhonor'
        },
        linkedin: {
          nick: 'Emperor Marcus Aurelius',
          link: 'https://www.linkedin.com/in/emperor.marcus.aurelius'
        },
        website: {
          title: 'Meditations of Marcus Aurelius',
          link: 'http://marcusaurelius.com'
        }
      });

      user.save((err, model) => {
        expect(err).to.be.null;
        expect(model).to.not.be.null;
        expect(model).to.have.property('_id');
        expect(model).to.have.property('username', 'Marcus Aurelius');
        expect(model).to.have.property('email', 'marcusaurelius@rome.gov');
        expect(model).to.have.deep.property('github.nick', '@soicismftw');
        expect(model).to.have.deep.property('github.link', 'https://github.com/soicismftw');
        expect(model).to.have.deep.property('twitter.nick', '@strengthandhonor');
        expect(model).to.have.deep.property('twitter.link', 'https://www.linkedin.com/in/strengthandhonor');
        expect(model).to.have.deep.property('linkedin.nick', 'Emperor Marcus Aurelius');
        expect(model).to.have.deep.property('linkedin.link', 'https://www.linkedin.com/in/emperor.marcus.aurelius');
        expect(model).to.have.deep.property('website.title', 'Meditations of Marcus Aurelius');
        expect(model).to.have.deep.property('website.link', 'http://marcusaurelius.com');
        done();
      });
    });
  });
};
