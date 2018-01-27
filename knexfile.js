module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      filename: './db.sql'
    }
  },

  migration: {
    directory: './migrations',
    tablename: 'create_tables'
  },

  production: {
    client: 'postgresql',
    connection: process.env.NODE_ENV
  },

  seeds: {
    directory: './database/seeds.js'
  }

};
