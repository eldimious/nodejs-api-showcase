const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const schemasFactory = require('../../../src/data/infrastructure/db/schemas');

const schemas = schemasFactory.create(mongoose);
const db = {
  schemas,
};
const {
  postRepository,
} = require('../../../src/data/repositories')(db);

const postDocs = [
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


function createDbPosts(total = []) {
  return () => {
    const doc = new db.schemas.Post(postDocs.pop());
    total.push(doc);
    if (postDocs.length > 0) {
      return createDbPosts(total)();
    }
    return total;
  };
}

// eslint-disable-next-line no-undef
describe('post repository test', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    sinon.stub(db.schemas.Post, 'paginate');
    sinon.stub(db.schemas.Post, 'findOne');
  });
  // eslint-disable-next-line no-undef
  afterEach(() => {
    db.schemas.Post.paginate.restore();
    db.schemas.Post.findOne.restore();
  });
  // eslint-disable-next-line no-undef
  describe('post list method', () => {
    // eslint-disable-next-line no-undef
    it('should call the db and return list of posts', async () => {
      const posts = createDbPosts([])();
      db.schemas.Post.paginate.resolves({
        docs: posts,
        page: 1,
        limit: 15,
        pages: 1,
        total: 3,
      });
      const response = await postRepository.list({
        page: 1,
        limit: 15,
      });
      expect(response.data).to.have.lengthOf(3);
      expect(response.pagination.total).to.eql(3);
      expect(response.pagination.limit).to.eql(15);
      expect(response.pagination.page).to.eql(1);
    });
  });
});
