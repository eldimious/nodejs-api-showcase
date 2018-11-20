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

    // it('should call the db and return list of advertiser with source facebook', async function () {
    //   db.entities.advertiser.findAndCountAll.resolves({
    //     rows: createDbAdvertisers().filter(advertiser => advertiser.source === 'facebook'),
    //     count: 2
    //   });
    //   const advertisers = await repos.advertiser.list({
    //     advertiserIds: [1, 2, 3],
    //     source: 'facebook'
    //   });
    //   expect(advertisers.data).to.have.lengthOf(2);
    // });

    // it('should call the db and return list of advertiser with sourceId', async function () {
    //   db.entities.advertiser.findAndCountAll.resolves({
    //     rows: createDbAdvertisers().filter(advertiser => advertiser.sourceId === 'test3'),
    //     count: 2
    //   });
    //   const advertisers = await repos.advertiser.list({
    //     advertiserIds: [1, 2, 3],
    //     sourceId: 'test3'
    //   });
    //   expect(advertisers.data).to.have.lengthOf(1);
    // });

    // it('should call the db and reject', async function () {
    //   const dbError = new Error('db advertiser list error');
    //   db.entities.advertiser.findAndCountAll.rejects(dbError);
    //   try {
    //     const advertisers = await repos.advertiser.list({
    //       advertiserIds: [1, 2, 3],
    //     });
    //   } catch (error) {
    //     expect(error).to.have.equal(dbError);
    //   }
    // });
  });

  // describe('advertiser getById method', function () {
  //   it('should call the db and return specific advertiser', async function () {
  //     db.entities.advertiser.findOne.resolves(createDbAdvertisers()[0]);
  //     const advertisers = await repos.advertiser.getById({
  //       advertiserId: 1
  //     });
  //     expect(advertisers.data.name).to.eql(createDbAdvertisers()[0].name);
  //   });
  //   it('should call the db and reject', async function () {
  //     const dbError = new Error('db advertiser list error');
  //     db.entities.advertiser.findOne.rejects(dbError);
  //     try {
  //       const advertisers = await repos.advertiser.getById({
  //         advertiserId: 1,
  //       });
  //     } catch (error) {
  //       expect(error).to.have.equal(dbError);
  //     }
  //   });
  // });

  // describe('advertiser count method', function () {
  //   it('should call the db and return count of advertiser', async function () {
  //     db.entities.advertiser.count.resolves(createDbAdvertisers().length);
  //     const advertisers = await repos.advertiser.count({});
  //     expect(advertisers.data.count).to.eql(3);
  //   });

  //   it('should call the db and return count of advertiser for cron-job', async function () {
  //     db.entities.advertiser.count.resolves(createDbAdvertisers().length);
  //     const advertisersCron = await repos.advertiser.count({
  //       advertiserIds: [1, 2, 3],
  //       type: 'cron-job',
  //     });
  //     expect(advertisersCron.data.count).to.eql(3);
  //   });

  //   it('should call the db and reject', async function () {
  //     const dbError = new Error('db advertiser list error');
  //     db.entities.advertiser.count.rejects(dbError);
  //     try {
  //       const advertisers = await repos.advertiser.count({
  //         advertiserIds: [1, 2, 3],
  //       });
  //     } catch (error) {
  //       expect(error).to.have.equal(dbError);
  //     }
  //   });
  // });
});