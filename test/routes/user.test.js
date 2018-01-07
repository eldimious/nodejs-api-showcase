'use strict';

const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');

const interfaces = sinon.stub();
const services = require('../../services')(interfaces);

const tweetService = services.tweetService;
const authService = services.authService;

const app = require('../../domain/app')(services);



const tweetData = require('../data/tweet').tweets;


/*eslint-disable */
describe('tweet route test', function () {
  describe('GET /tweet test', function () {
    let token;

    beforeEach((done) => {
      sinon.stub(tweetService, 'getList');
      sinon.stub(authService, 'login');
      return done();
    });

    afterEach(() => {
      tweetService.getList.restore();
    });


    it('should return 200 an array of tweets', function (done) {
      tweetService.getList.resolves(tweetData);
      return request(app)
        .get('/tweets')
        .set('Authorization', token)
        .expect(200)
        .then((res) => {
          expect(res.body.data.length).to.eql(tweetData.length);
          return done();
        })
        .catch((error) => {
          console.log('error', error)
        })
    });

    it('should return 500 when the service rejects with an error', function () {
      const dbError = new Error('Database error');
      tweetService.getList.rejects(dbError);

      return request(app)
        .get('/tweets')
        .expect(500)
        .catch((error) => {
          expect(error).to.be.equal(dbError);
        });
    });
  });


  describe('GET /tweets/:id test', function () {
    beforeEach(() => {
      sinon.stub(tweetService, 'get');
    });
    afterEach(() => {
      tweetService.get.restore();
    });

    it('should return a tweet', function (done) {
      tweetService.get.resolves(tweetData[0]);

      request(app)
        .get('/tweet/5a3b9a95e9f13308a30740a5')
        .expect(200)
        .then((res) => {
          expect(res.body.data.user.email).to.eql(tweetData[0].email);
          return done();
        });
    });
  });
});
