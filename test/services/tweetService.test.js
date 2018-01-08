'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Tweet = require('../../models/Tweet');
const tweetServiceFactory = require('../../services/tweetService');

const db = sinon.stub();
const tweetService = tweetServiceFactory.init(db);

function createUsers() {
  const alex = new Tweet({ url: 'www.test.com', surname: 'www.testimage.com', type: 'image', username: 'Aris', created: '2017-08-30T08:17:50.460Z', _id: '5a3b9a95e9f13308a30740a5' });
  const aris = new Tweet({ name: 'www.test.com', surname: 'www.testimage.com', type: 'image', username: 'Alex', created: '2017-08-30T08:17:50.460Z', _id: 'testid2' });
  return [alex, aris];
}

describe('tweet service test', function () {
  beforeEach(() => {
    sinon.stub(tweetService, 'getList');
    sinon.stub(tweetService, 'get');
  });

  afterEach(() => {
    tweetService.getList.restore();
    tweetService.get.restore();
  });

  it('should call the repository to fetch the tweet using getList function', function (done) {
    tweetService.getList.resolves(createUsers());
    tweetService.getList()
      .then((users) => {
        expect(users).to.have.lengthOf(2);
        expect(users).to.eql(createUsers());
        return done();
      });
  });
});
