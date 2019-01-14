const Post = require('../../domain/posts/model');


module.exports.posts = [
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
