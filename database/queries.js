const knex = require('./db');

const projects = id => id
  ? knex('projects').select().where('id', id)
  : knex('projects').select('projects.title', 'projects.url', 'projects.github', 'projects.text', 'projects.id', 'projects.text', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile')
    .join('users', 'projects.user_id', '=', 'users.id')
    .orderBy('projects.created_at', 'desc');
    ;

const feedback = id => id
  ? knex('feedback').select()
    .join('users', 'feedback.user_id', '=', 'users.id')
    .join('types', 'feedback.type_id', '=', 'types.id')
    .where('project_id', id)
  : knex('feedback').select();

const users = name => name
  ? knex('users').select().where('name', name)
  : knex('users').select();

const tags = () => knex('tags').select('tag');

const userProjects = name => knex('projects')
  .select()
  .where('user_id', knex('users').where('name', name).select('id'));

const userFeedback = name => knex('feedback')
  .select(knex.raw('to_json(feedback.*) as feedback'), knex.raw('to_json(projects.*) as project'))
  .join('projects', 'feedback.project_id', '=', 'projects.id')
  .where('feedback.user_id', knex('users').where('name', name).select('id'));

module.exports = {
  projects,
  feedback,
  users,
  tags,
  userProjects,
  userFeedback
};
