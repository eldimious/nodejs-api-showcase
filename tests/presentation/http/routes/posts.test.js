/* eslint-disable no-undef */
require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const Post = require('../../../../src/domain/posts/model');
const postsRepositoryContainer = require('../../../../src/data/repositories/posts');
const usersRepositoryContainer = require('../../../../src/data/repositories/users');
const authenticationRepositoryContainer = require('../../../../src/data/repositories/authenticationRepository');
const recourceLimiterRepositoryContainer = require('../../../../src/data/repositories/recourceLimiterRepository');
const authServiceContainer = require('../../../../src/domain/auth/service');
const postsServiceContainer = require('../../../../src/domain/posts/service');
const usersServiceContainer = require('../../../../src/domain/users/service');
const appContainer = require('../../../../src/presentation/http/app');

const db = sinon.stub();
const authenticationRepository = authenticationRepositoryContainer.init();
const postsRepository = postsRepositoryContainer.init(db);
const usersRepository = usersRepositoryContainer.init(db);
const recourceLimiterRepository = recourceLimiterRepositoryContainer.init();
const authService = authServiceContainer.init({
  authenticationRepository,
  usersRepository,
  recourceLimiterRepository,
});
const postsService = postsServiceContainer.init({
  postsRepository,
});
const usersService = usersServiceContainer.init({
  usersRepository,
  postsRepository,
});
const app = appContainer.init({
  authService,
  postsService,
  usersService,
});

const postData = [
  new Post({
    imageUrl: 'www.test.com',
    description: 'test text content1',
    publisher: 'Alex',
    created: '2017-08-30T08:17:50.460Z',
    _id: '5a3b9a95e9f13308a30740a5',
  }),
  new Post({
    imageUrl: 'www.test1.com',
    description: 'test text content2',
    publisher: 'Aris',
    created: '2017-08-30T08:17:50.460Z',
    _id: 'testId2',
  }),
  new Post({
    imageUrl: 'www.test2.com',
    description: 'test text content3',
    publisher: 'Pantelis',
    created: '2017-08-30T08:17:50.460Z',
    _id: 'testId3',
  }),
];

const jwtSecret = process.env.JWT_SECRET;
const testEmail = 'kent@gmail.com';
const testFullname = 'klark kent';
const testID = '111111';
let testToken;

describe('post routes test', () => {
  describe('GET /users/:userId/post test', () => {
    beforeEach((done) => {
      sinon.stub(postsService, 'listUserPosts');
      testToken = jwt.sign({ email: testEmail, fullName: testFullname, _id: testID }, jwtSecret, { expiresIn: 120 });
      return done();
    });
    afterEach(() => {
      postsService.listUserPosts.restore();
    });
    it('should return 200 an array of posts', (done) => {
      postsService.listUserPosts.resolves(postData);
      request(app)
        .get('/users/5fb02910c74ce3697859cee2/posts')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.eql(postData.length);
          return done();
        });
    });
    it('should return 403 when no token send', () => request(app)
      .get('/users/5fb02910c74ce3697859cee2/posts')
      .expect(401));
    it('should return 401 when we send invalid token', () => request(app)
      .get('/users/5fb02910c74ce3697859cee2/posts')
      .set('Authorization', `Bearer ${testToken}test`)
      .expect(401));
  });

  describe('GET /users/:userId/posts/:id test', () => {
    beforeEach(() => {
      sinon.stub(postsService, 'getUserPost');
    });
    afterEach(() => {
      postsService.getUserPost.restore();
    });
    it('should return a post', (done) => {
      postsService.getUserPost.resolves(postData[0]);
      request(app)
        .get('/users/5fb02910c74ce3697859cee2/posts/5a511ff1568c490f9e0e4b4d')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .then(() => done());
    });
  });
});
