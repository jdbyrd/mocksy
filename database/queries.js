const knex = require('./db');

const projects = () => knex('projects').select();

module.exports = { projects };
