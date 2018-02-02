const knex = require('./db');

const project = id => knex('projects').where({ id }).del();

const projectFeedback = id => knex('feedback').where({ project_id: id }).del();

const feedback = id => knex('feedback').where({ id }).del();

module.exports = {
  project,
  projectFeedback,
  feedback
};
