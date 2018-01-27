const knex = require('./db');

const user = (name, password) => knex('users').insert({ name, password });

const project = (data) => {
  const { name, title, url, github, text, contributor } = data;
  const userid = knex('users').where({ name }).select('id');
  knex('projects').insert({
    title,
    url,
    github,
    text,
    contributor,
    userid
  })
    .then(() => console.log('inserted project into database'))
    .catch(error => console.log('DID NOT ADD PROJECT: ', error));
};

const feedback = (data) => {
  const { title, name, upvotes, downvotes, text } = data;
  const userid = knex('users').where({ name }).select('id');
  const projectid = knex('projects').where({ title }).select('id');
  knex('feedback').insert({
    upvotes,
    downvotes,
    text,
    userid,
    projectid
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
