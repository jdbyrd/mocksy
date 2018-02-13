const knex = require('./db');

const projects = id => id
  ? knex('projects').select('projects.*', 'users.name', 'users.display_name', 'users.avatar', 'users.github_profile')
    .where('projects.id', id)
    .join('users', 'projects.user_id', '=', 'users.id')
  : knex('projects').select('projects.*', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile')
    .join('users', 'projects.user_id', '=', 'users.id')
    .orderBy('projects.created_at', 'desc');

const sortProjects = id => id
  ? knex('projects').select().where('id', id)
  : knex('projects').select('projects.*', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile')
    .join('users', 'projects.user_id', '=', 'users.id')
    .orderBy('num_feedback', 'desc');

const feedback = (id, userId, sort) => {
  let query = knex.raw('created_at');
  let order = 'desc';
  if (sort === 'controversial') {
    query = knex.raw('feedback.up + feedback.down');
  } else if (sort === 'upvoted') {
    console.log('sort running!!@#@#$#$')
    query = knex.raw('feedback.up - feedback.down');
  } else if (sort === 'downvoted') {
    query = knex.raw('feedback.up - feedback.down');
    order = 'asc';  
  }
  return userId
    ?  knex('feedback').select('feedback.*', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile', 'types.options', 'types.type_id', 'votes.vote', 'votes.votes_id')
      .join('users', 'feedback.user_id', '=', 'users.id')
      .join('types', 'feedback.type_id', '=', 'types.type_id')
      .leftJoin('votes', function() {
        this.on('votes.feedback_id', '=', 'feedback.id').andOn('votes.user_id', '=', knex.raw(userId));
      })
      .where('project_id', id)
      .orderBy(query, order)
    : knex('feedback').select('feedback.*', 'users.name', 'users.avatar', 'users.display_name', 'users.github_profile', 'types.options', 'votes.vote')
      .join('users', 'feedback.user_id', '=', 'users.id')
      .join('types', 'feedback.type_id', '=', 'types.type_id')
      .leftJoin('votes', function() {
        this.on('votes.feedback_id', '=', 'feedback.id').andOn('votes.user_id', '=', knex.raw(-1));
      })
      .where('project_id', id)
      .orderBy(query, order);
};

const users = name => name
  ? knex('users').where('name', name).select()
  : knex('users').select();

const tags = () => knex('tags').select('tag', 'project_id');

const userProjects = name => knex('projects')
  .select()
  .where('user_id', knex('users').where('name', name).select('id'));

const userFeedback = name => knex('feedback')
  .select(knex.raw('to_json(feedback.*) as feedback'), knex.raw('to_json(projects.*) as project'))
  .join('projects', 'feedback.project_id', '=', 'projects.id')
  .where('feedback.user_id', knex('users').where('name', name).select('id'));

const votes = (user_id, feedback_id) => knex('votes')
  .where({ user_id, feedback_id })
  .select();

const votesById = votes_id => knex('votes')
  .where({ votes_id })
  .select();

const issues = (user_id, feedback_id) => knex('issues')
  .where({ user_id, feedback_id})
  .select();

const searchProjects = q => knex('projects')
  .select()
  .where(knex.raw(`lower(title) like lower('${q}')`));

const searchUsers = q => knex('users')
  .select()
  .where(knex.raw(`lower(name) like lower('${q}')`))
  .orWhere(knex.raw(`lower(display_name) like lower('${q}')`));

const getUserFromId = id => knex('users')
  .where({ id })
  .first();

const getFeedbackId = (fromUser, project, feedback, projectid) => knex('feedback')
  .select()
  .where({ user_id: knex('users').where('name', fromUser).select('id'), project_id: projectid, text: feedback });

const getNotifications = user => knex('feedback')
  .select('feedback.id', 'users.name', 'projects.title', 'feedback.project_id')
  .where({ 'feedback.user_id': knex('users').where('name', user).select('id'), notified: 'f' })
  .join('projects', 'feedback.project_id', '=', 'projects.id')
  .join('users', 'feedback.user_id', '=', 'users.id')
  .orderBy('feedback.created_at', 'desc');

module.exports = {
  projects,
  feedback,
  users,
  tags,
  userProjects,
  userFeedback,
  votes,
  votesById,
  issues,
  searchProjects,
  searchUsers,
  sortProjects,
  getUserFromId,
  getFeedbackId,
  getNotifications
};
