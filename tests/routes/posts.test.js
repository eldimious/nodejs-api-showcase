require('dotenv').config();
const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const Post = require('../../src/domain/posts/model');

const repositories = sinon.stub();
const services = require('../../src/domain')(repositories);
const app = require('../../src/router/http/app')(services);
const jwt = require('jsonwebtoken');

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

const postService = services.postService;
const jwtSecret = process.env.JWT_SECRET;
const testEmail = 'kent@gmail.com';
const testFullname = 'klark kent';
const testID = '111111';

let testToken;

// eslint-disable-next-line no-undef
describe('post routes test', () => {
  // eslint-disable-next-line no-undef
  describe('GET /post test', () => {

    let auth = {};
    // eslint-disable-next-line no-undef
    beforeEach((done) => {
      sinon.stub(postService, 'list');
      testToken = jwt.sign({ email: testEmail, fullName: testFullname, _id: testID }, jwtSecret, { expiresIn: 120 });
      return done();
    });
    // eslint-disable-next-line no-undef
    afterEach(() => {
      postService.list.restore();
    });

    // eslint-disable-next-line no-undef
    it('should return 200 an array of posts', (done) => {
      postService.list.resolves(postData);
      request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.eql(postData.length);
          return done();
        });
    });
    // eslint-disable-next-line no-undef
    it('should return 403 when no token send', () => {
      return request(app)
        .get('/posts')
        .expect(401);
    });
    // eslint-disable-next-line no-undef
    it('should return 401 when we send invalid token', () => {
      return request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${testToken}test`)
        .expect(401)
    });
  });
  // eslint-disable-next-line no-undef
  describe('GET /posts/:id test', () => {
    // eslint-disable-next-line no-undef
    beforeEach(() => {
      sinon.stub(postService, 'get');
    });
    // eslint-disable-next-line no-undef
    afterEach(() => {
      postService.get.restore();
    });
    // eslint-disable-next-line no-undef
    it('should return a post', (done) => {
      postService.get.resolves(postData[0]);
      request(app)
        .get('/posts/5a511ff1568c490f9e0e4b4d')
        .set('Authorization', `Bearer ${testToken}`)
        .expect(200)
        .then((res) => {
          return done();
        })
    });
  });
});
