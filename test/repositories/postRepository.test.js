const expect = require('chai').expect;
const sinon = require('sinon');
const PostModel = require('../../domain/post/model');
const Post = require('../../data/infrastructure/db/entities/Post');

const db = {
  entities: {
    Post,
  },
};

const {
  postRepository,
} = require('../../data/repositories')(db);

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
    const doc = new db.entities.Post(postDocs.pop());
    total.push(doc);
    if (postDocs.length > 0) {
      return createDbPosts(total)();
    }
    return total;
  };
}

describe('post repository test', function () {
  beforeEach(() => {
    sinon.stub(db.entities.Post, 'paginate');
    sinon.stub(db.entities.Post, 'findOne');
  });

  afterEach(() => {
    db.entities.Post.paginate.restore();
    db.entities.Post.findOne.restore();
  });


  describe('post list method', function () {
    it('should call the db and return list of posts', async function () {
      const posts = createDbPosts([])();
      db.entities.Post.paginate.resolves({
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
