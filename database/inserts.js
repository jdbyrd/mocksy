const knex = require('./db');

const user = data => knex('users').insert({ name: data.username, avatar: data.photos[0].value, display_name: data.displayName, email: data.emails[0].value, github_profile: data.profileUrl });

const project = (data) => {
  const { name, title, url, github, text, contributor } = data;
  const userId = knex('users').where({ name }).select('id');
  knex('projects').insert({
    title,
    url,
    github,
    text,
    contributor,
    user_id: userId
  })
    .then(() => console.log('inserted project into database'))
    .catch(error => console.log('DID NOT ADD PROJECT: ', error));
};

const feedback = (data) => {
  const { name, text, projectId } = data;
  const userId = knex('users').where({ name }).select('id');
  knex('feedback').insert({
    text,
    user_id: userId,
    project_id: projectId
  })
    .then(() => console.log('inserted feedback into database'))
    .catch(error => console.log('DID NOT ADD FEEDBACK: ', error));
};

const tags = (data) => {
  const { name } = data;
  knex('tags').insert({ name })
    .then(() => console.log('inserted tag into database'))
    .catch(error => console.log('DID NOT ADD TAG: ', error));
};

const reviewType = (data) => {
  const { option } = data;
  knex('review_type').insert({ option })
    .then(() => console.log('inserted reviewType into database'))
    .catch(error => console.log('DID NOT ADD REVIEWTYPE: ', error));
};

module.exports = {
  user,
  project,
  feedback,
  tags,
  reviewType
};
