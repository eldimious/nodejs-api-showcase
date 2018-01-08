'use strict';

const Tweet = require('../../models/Tweet');

module.exports.tweets = [new Tweet({ url: 'www.test.com', surname: 'www.testimage.com', type: 'image', username: 'Alex', created: '2017-08-30T08:17:50.460Z', _id: '5a3b9a95e9f13308a30740a5' }), new Tweet({ url: 'www.test1.com', surname: 'www.testimage1.com', type: 'image', username: 'Aris', created: '2017-08-30T08:17:50.460Z', _id: 'testId2' }), new Tweet({ url: 'www.test2.com', surname: 'www.testimage2.com', type: 'image', username: 'Pantelis', created: '2017-08-30T08:17:50.460Z', _id: 'testId3' })];
