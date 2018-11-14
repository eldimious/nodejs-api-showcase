'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Tweet = require('../../models/Tweet');
const tweetServiceFactory = require('../../services/tweetService');

const db = sinon.stub();
const tweetService = tweetServiceFactory(db);

function createUsers() {
  const alex = new Tweet({ url: 'www.test.com', type: 'image', source: 'twitter', publisher: 'Aris', created: '2017-08-30T08:17:50.460Z', _id: '5a3b9a95e9f13308a30740a5' });
  const aris = new Tweet({ name: 'www.test.com', type: 'image', source: 'twitter', publisher: 'Alex', created: '2017-08-30T08:17:50.460Z', _id: 'testid2' });
  return [alex, aris];
}

describe('tweet service test', function () {
  beforeEach(() => {
    sinon.stub(tweetService, 'list');
    sinon.stub(tweetService, 'get');
  });

  afterEach(() => {
    tweetService.list.restore();
    tweetService.get.restore();
  });

  it('should call the repository to fetch the tweet using getList function', function (done) {
    tweetService.list.resolves(createUsers());
    tweetService.list()
      .then((tweets) => {
        expect(tweets).to.have.lengthOf(2);
        expect(tweets).to.eql(createUsers());
        return done();
      });
  });
});
