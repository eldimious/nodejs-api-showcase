require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');

const repositories = sinon.stub();
const services = require('../../domain')(repositories);
const app = require('../../router/app')(services);
const jwt = require('jsonwebtoken');
const tweetData = require('../data/tweet').tweets;

const tweetService = services.tweetService;
const jwtSecret = process.env.JWT_SECRET;
const testEmail = process.env.TEST_EMAIL;
const testFullname = process.env.TEST_FULL_NAME;
const testID = process.env.TEST_ID;

let testToken;

/*eslint-disable */
describe('tweet route test', function () {
  describe('GET /tweet test', function () {

    var auth = {};
    //before(loginUser(auth));

    beforeEach((done) => {
      sinon.stub(tweetService, 'list');
      testToken = jwt.sign({ email: testEmail, fullName: testFullname, _id: testID }, jwtSecret, { expiresIn: 120 });
      return done();
    });

    afterEach(() => {
      tweetService.list.restore();
    });


    it('should return 200 an array of tweets', function (done) {
      tweetService.list.resolves(tweetData);
      request(app)
        .get('/tweets')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.eql(tweetData.length);
          return done();
        })
    });

    it('should return 403 when no token send', function () {
      return request(app)
        .get('/tweets')
        .expect(401)
    });

    it('should return 401 when we send invalid token', function () {
      return request(app)
        .get('/tweets')
        .set('Authorization', `Bearer ${testToken}test`)
        .expect(401)
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
        .get('/tweets/5a511ff1568c490f9e0e4b4d')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .then((res) => {
          return done();
        })
    });
  });
});
