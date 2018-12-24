const connectorFactory = require('./connector');
const entities = require('./entities');

module.exports = ({
  dbConnectionString,
}) => ({
  connector: connectorFactory(dbConnectionString),
  entities,
});
