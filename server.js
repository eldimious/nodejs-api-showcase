require('dotenv').config();
const { httpPort } = require('./configuration');
const db = require('./db');
const interfaces = require('./interfaces')(db);
const services = require('./services')(interfaces);
const app = require('./domain/app')(services);

const server = app.listen(httpPort, () => {
  console.log(`Listening on *:${httpPort}`);
});
