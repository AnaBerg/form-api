import knex from 'knex';
import path from 'path';

const db = knex({
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve('./src/database/migrations'),
  },
});

export default db;
