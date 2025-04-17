module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'blog_management',
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
