module.exports = {
  
  development: {
    client: 'postgresql',
    connection: {
      filename: "./index.js"
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
    directory: './seeds.js'
  }

};
