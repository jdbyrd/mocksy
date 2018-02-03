const knex = require('./db');

const projects = id => id
  ? knex('projects').select().where('id', id)
  : knex('projects').select('projects.title', 'projects.url', 'projects.github', 'projects.text', 'projects.id', 'projects.text', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile')
    .join('users', 'projects.user_id', '=', 'users.id')
    .orderBy('projects.created_at', 'desc');

const feedback = (id, userId) => userId
  ? knex('feedback').select('feedback.id', 'feedback.text', 'feedback.project_id', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile', 'types.options', 'votes.vote', 'votes.votes_id')
    .join('users', 'feedback.user_id', '=', 'users.id')
    .join('types', 'feedback.type_id', '=', 'types.id')
    .leftJoin('votes', function() {
      this.on('votes.feedback_id', '=', 'feedback.id').andOn('votes.user_id', '=', knex.raw(userId))
    })
    .where('project_id', id)
  : knex('feedback').select('feedback.id', 'feedback.text', 'feedback.project_id', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile', 'types.options')
    .join('users', 'feedback.user_id', '=', 'users.id')
    .join('types', 'feedback.type_id', '=', 'types.id')
    .where('project_id', id);

const users = name => name
  ? knex('users').where('name', name).select()
  : knex('users').select();

const tags = () => knex('tags').select('tag');

const userProjects = name => knex('projects')
  .select()
  .where('user_id', knex('users').where('name', name).select('id'));

const userFeedback = name => knex('feedback')
  .select(knex.raw('to_json(feedback.*) as feedback'), knex.raw('to_json(projects.*) as project'))
  .join('projects', 'feedback.project_id', '=', 'projects.id')
  .where('feedback.user_id', knex('users').where('name', name).select('id'));

const votes = name => knex('votes')
  .select()
  .where('user_id', knex('users').where('name', name).select('id'));
  
const searchProjects = q => knex('projects')
  .select()
  .where(knex.raw(`lower(title) like lower('${q}')`));

const searchUsers = q => knex('users')
  .select()
  .where(knex.raw(`lower(name) like lower('${q}')`))
  .orWhere(knex.raw(`lower(display_name) like lower('${q}')`));

module.exports = {
  projects,
  feedback,
  users,
  tags,
  userProjects,
  userFeedback,
  votes,
  searchProjects,
  searchUsers
};
