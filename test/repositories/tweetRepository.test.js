const expect = require('chai').expect;
const sinon = require('sinon');
const TweetModel = require('../../models/Tweet');
const Tweet = require('../../db/entities/Tweet');

const db = {
  entities: {
    Tweet,
  },
};

const {
  tweetRepository,
} = require('../../repositories')(db);

const tweetDocs = [
  {
    userId: '5a510cf183fd9d0c74898e74',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpeF6dmyApzNtT4UsGGtztb6ioOspen7pM8SAMRMIbY8gIeDh3', 
    publisher: 'fb',
  },
  {
    userId: '5a510cf183fd9d0c74898e74',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpeF6dmyApzNtT4UsGGtztb6ioOspen7pM8SAMRMIbY8gIeDh3', 
    publisher: 'fb',
  },
  {
    userId: '5a5381ce26a3a8259070ae0f',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpeF6dmyApzNtT4UsGGtztb6ioOspen7pM8SAMRMIbY8gIeDh3', 
    publisher: 'twitter',
  },
];


function createDbTweets(total = []) {
  return () => {
    const doc = new db.entities.Tweet(tweetDocs.pop());
    total.push(doc);
    if (tweetDocs.length > 0) {
      return createDbTweets(total)();
    }
    return total;
  };
}


describe('tweet repository test', function () {
  beforeEach(() => {
    sinon.stub(db.entities.Tweet, 'paginate');
    sinon.stub(db.entities.Tweet, 'findOne');
  });

  afterEach(() => {
    db.entities.Tweet.paginate.restore();
    db.entities.Tweet.findOne.restore();
  });


  describe('tweet list method', function () {
    it('should call the db and return list of tweets', async function () {
      const tweets = createDbTweets([])();
      db.entities.Tweet.paginate.resolves({
        docs: tweets,
        page: 1,
        limit: 15,
        pages: 1,
        total: 3,
      });
      const response = await tweetRepository.list({
        page: 1,
        limit: 15,
      });
      expect(response.tweets).to.have.lengthOf(3);
      expect(response.pagination.total).to.eql(3);
      expect(response.pagination.limit).to.eql(15);
      expect(response.pagination.page).to.eql(1);
    });
  });
});