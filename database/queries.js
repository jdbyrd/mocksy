const knex = require('./db');

const projects = id => id
  ? knex('projects').select().where('id', id)
  : knex('projects').select();

const feedback = id => id
  ? knex('feedback').select().where('project_id', id)
  : knex('feedback').select();

module.exports = {
  projects,
  feedback
};
