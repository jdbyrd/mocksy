const knex = require('./db');

const user = data => knex('users').insert({
  name: data.username,
  avatar: data.photos[0].value,
  display_name: data.displayName,
  github_profile: data.profileUrl,
});

const project = (data) => {
  const { name, title, appURL, githubURL, description, contributors } = data;
  const userId = knex('users').where({ name }).select('id');
  return knex('projects').insert({
    title,
    url: appURL,
    github: githubURL,
    text: description,
    user_id: userId
  })
    // .then(() => { /* add tags to tags table? */ })
    // .then(() => { /* add contributors to contributors table? */ })
    .then(() => {
      console.log('inserted project into database');
      return knex('projects').where({ url: appURL }).select('id');
    })
    .catch(error => console.log('DID NOT ADD PROJECT: ', error));
};

const feedback = (data) => {
  const {
    name,
    text,
    projectId,
    type,
    hasImages
  } = data;
  const userId = knex('users').where({ name }).select('id');
  return knex('feedback').insert({
    text,
    user_id: userId,
    project_id: projectId,
    type_id: type,
    has_images: hasImages
  })
    .returning('id')
    .then((id) => {
      console.log('inserted feedback into database');
      return id;
    })
    .catch(error => console.log('DID NOT ADD FEEDBACK: ', error));
};

const tags = (data) => {
  const tagList = data.tags;
  const { projectId } = data;
  tagList.forEach((tag) => {
    knex('tags').insert({ tag, project_id: projectId })
      .then(() => console.log('inserted tag into database'))
      .catch(error => console.log('DID NOT ADD TAG: ', error));
  });
};

const updateNumFeedback = (id) => {
  knex('projects')
    .where('id', id)
    .increment('num_feedback', 1)
    .then(() => console.log('added +1 to numFeedback'))
    .catch(error => console.log('DID NOT ADD 1 TO NUMFEEDBACK COLUMN: ', error));
};

const decreaseNumFeedback = (id) => {
  knex('projects')
    .where('id', id)
    .decrement('num_feedback', 1)
    .then(() => console.log('added -1 to numFeedback'))
    .catch(error => console.log('DID NOT SUBTRACT 1 TO NUMFEEDBACK COLUMN: ', error));
};

const vote = (name, feedback_id, vote, id_project) => {
  knex('votes').insert({user_id: knex('users').where({ name }).select('id'), feedback_id, vote, id_project })
    .then(() => console.log('inserted vote'))
    .catch(error => console.log('did not add vote: ', error));
};

module.exports = {
  user,
  project,
  feedback,
  tags,
  updateNumFeedback,
  decreaseNumFeedback,
  vote
};
