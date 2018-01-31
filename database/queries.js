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

const userProjects = name => knex('projects').select().where('user_id', knex('users').where('name', name).select('id'));

const userFeedback = name => knex('feedback').select().join('projects', 'feedback.project_id', '=', 'projects.id').where('feedback.user_id', knex('users').where('name', name).select('id'));

module.exports = {
  projects,
  feedback,
  users,
  userProjects,
  userFeedback
};
