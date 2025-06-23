const { SqliteDriver } = require('@mikro-orm/sqlite');
const { RequestLog } = require('./entities/RequestLog');

module.exports = {
  entities: [RequestLog],
  dbName: 'request-logs.sqlite3',
  driver: SqliteDriver,
  debug: true,
}; 