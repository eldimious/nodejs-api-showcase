const expect = require('chai').expect;
const sinon = require('sinon');
const Post = require('../../../src/domain/posts/model');
const postServiceFactory = require('../../../src/domain/posts/service');
const postRepositoryFactory = require('../../../src/data/repositories/posts');

const db = sinon.stub();

const postRepository = postRepositoryFactory.init(db);
const postService = postServiceFactory.init(postRepository);

function createPosts() {
  const alex = new Post({ imageUrl: 'www.test.com', description: 'test1', publisher: 'Aris', created: '2017-08-30T08:17:50.460Z', _id: '5a3b9a95e9f13308a30740a5' });
  const aris = new Post({ imageUrl: 'www.test1.com', description: 'test2', publisher: 'Alex', created: '2017-08-30T08:17:50.460Z', _id: 'testid2' });
  return [alex, aris];
}

// eslint-disable-next-line no-undef
describe('post service test', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    sinon.stub(postService, 'listUserPosts');
    sinon.stub(postService, 'getUserPost');
  });
  // eslint-disable-next-line no-undef
  afterEach(() => {
    postService.listUserPosts.restore();
    postService.getUserPost.restore();
  });
  // eslint-disable-next-line no-undef
  it('should call the repository to list user posts using listUserPosts function', (done) => {
    postService.listUserPosts.resolves(createPosts());
    postService.listUserPosts()
      .then((posts) => {
        expect(posts).to.have.lengthOf(2);
        expect(posts).to.eql(createPosts());
        return done();
      });
  });
});
