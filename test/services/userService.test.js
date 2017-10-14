'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../../models/User');
const userServiceFactory = require('../../services/userService');

const db = sinon.stub();
const userService = userServiceFactory.init(db);

function createUsers() {
  const alex = new User('Alex', 'alex@gmail.com', '2017-08-30T08:17:50.460Z', 'testId1');
  const aris = new User('Aris', 'aris@gmail.com', '2017-08-30T08:17:50.460Z', 'testId2');
  return [alex, aris];
}

describe('user service test', function () {
  beforeEach(() => {
    sinon.stub(userService, 'getList');
    sinon.stub(userService, 'get');
  });

  afterEach(() => {
    userService.getList.restore();
    userService.get.restore();
  });

  it('should call the repository to fetch the users using getList function', function (done) {
    userService.getList.resolves(createUsers());
    userService.getList()
      .then((users) => {
        expect(users).to.have.lengthOf(2);
        expect(users).to.eql(createUsers());
        return done();
      });
  });
});
