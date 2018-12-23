const expect = require('chai').expect;
const sinon = require('sinon');
const Tweet = require('../../domain/tweet/model');
const tweetServiceFactory = require('../../domain/tweet/service');
const tweetRepositoryFactory = require('../../data/tweet/repository');

const db = sinon.stub();
const tweetRepository = tweetRepositoryFactory(db);
const tweetService = tweetServiceFactory(tweetRepository);

function createTweets() {
  const alex = new Tweet({ imageUrl: 'www.test.com', description: 'test1', publisher: 'Aris', created: '2017-08-30T08:17:50.460Z', _id: '5a3b9a95e9f13308a30740a5' });
  const aris = new Tweet({ imageUrl: 'www.test1.com', description: 'test2', publisher: 'Alex', created: '2017-08-30T08:17:50.460Z', _id: 'testid2' });
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
    tweetService.list.resolves(createTweets());
    tweetService.list()
      .then((tweets) => {
        expect(tweets).to.have.lengthOf(2);
        expect(tweets).to.eql(createTweets());
        return done();
      });
  });
});
