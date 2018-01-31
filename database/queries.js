const knex = require('./db');

const projects = id => id
  ? knex('projects').select().where('id', id)
  : knex('projects').select();

const feedback = id => id
  ? knex('feedback').select().join('users', 'feedback.user_id', '=', 'users.id').where('project_id', id)
  : knex('feedback').select();

const users = name => name
  ? knex('users').select().where('name', name)
  : knex('users').select();

module.exports = {
  projects,
  feedback,
  users
};
