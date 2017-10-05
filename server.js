require('dotenv').config();
const { port } = require('./configuration');
const db = require('./db');
const interfaces = require('./interfaces')(db);
const services = require('./services')(interfaces);
const app = require('./domain/app')(services);

const server = app.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
