'use strict';

const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');

const interfaces = sinon.stub();
const services = require('../../services')(interfaces);

const userService = services.userService;

const app = require('../../domain/app')(services);

const userData = require('../data/user').users;

/*eslint-disable */
describe('user route test', function () {
  describe('GET /users test', function () {
    beforeEach(() => {
      sinon.stub(userService, 'getList');
    });
    afterEach(() => {
      userService.getList.restore();
    });

    it('should return 200 an array of users', function (done) {
      userService.getList.resolves(userData);

      request(app)
        .get('/users')
        .expect(200)
        .then((res) => {
          expect(res.body.usersList).to.eql(userData);
          return done();
        });
    });

    it('should return 500 when the service rejects with an error', function () {
      const dbError = new Error('Database error');
      userService.getList.rejects(dbError);

      return request(app)
        .get('/users')
        .expect(500)
        .catch((error) => {
          expect(error).to.be.equal(dbError);
        });
    });
  });


  describe('GET /users/:id test', function () {
    beforeEach(() => {
      sinon.stub(userService, 'get');
    });
    afterEach(() => {
      userService.get.restore();
    });

    it('should return a user', function (done) {
      userService.get.resolves(userData[0]);

      request(app)
        .get('/users/Alex')
        .expect(200)
        .then((res) => {
          expect(res.body).to.eql(userData[0]);
          return done();
        });
    });
  });
});
