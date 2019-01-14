const User = require('../../domain/users/model');


module.exports.users = [
  new User({ name: 'Alex', surname: 'Koufa', username: 'Koufaklis', email: 'alex@gmail.com', created: '2017-08-30T08:17:50.460Z', _id: '5a3b9a95e9f13308a30740a5' }),
  new User({ name: 'Aris', surname: 'Goudouras', username: 'Goud', email: 'aris@gmail.com', created: '2017-08-30T08:17:50.460Z', _id: 'testId2' }),
  new User({ name: 'Pantelis', surname: 'Ieronimakis', username: 'Lakis', email: 'pantelis@gmail.com', created: '2017-08-30T08:17:50.460Z', _id: 'testId3' }),
];
