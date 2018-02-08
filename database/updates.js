const knex = require('./db');

const vote = (votes_id, vote) => {
  knex('votes')
    .where('votes_id', '=', votes_id)
    .update({ vote })
    .then(() => console.log('updated vote'));
};

const incrementFeedbackUp = (feedbackId) => {
  knex('feedback')
    .where('id', '=', feedbackId)
    .increment('up', 1)
    .then(() => console.log('updated feedback Up'));
};

const incrementFeedbackDown = (feedbackId) => {
  knex('feedback')
    .where('id', '=', feedbackId)
    .increment('down', 1)
    .then(() => console.log('updated feedback Down'));
};

const decrementFeedbackUp = (feedbackId) => {
  knex('feedback')
    .where('id', '=', feedbackId)
    .decrement('up', 1)
    .then(() => console.log('updated feedback Up'));
};

const decrementFeedbackDown = (feedbackId) => {
  knex('feedback')
    .where('id', '=', feedbackId)
    .decrement('down', 1)
    .then(() => console.log('updated feedback Down'));
};

const feedback = (update) => {
  const { feedbackId, text } = update;
  knex('feedback')
    .where('id', '=', feedbackId)
    .update({ text })
    .then(() => console.log('updated feedback text'));
};

const project = (update) => {
  const { projectId, text } = update;
  knex('projects')
    .where('id', '=', projectId)
    .update({ text })
    .then(() => console.log('updated project text'));
};

const bio = (name, text) => {
  knex('users').update('bio', text)
    .then(() => console.log('updated bio'));
};

const issue = (issue_id, marked) => {
  knex('issues')
    .where('issue_id', '=', issue_id)
    .update({ marked })
    .then(() => console.log('updated issue'));
};

module.exports = {
  vote,
  incrementFeedbackUp,
  incrementFeedbackDown,
  decrementFeedbackUp,
  decrementFeedbackDown,
  feedback,
  project,
  bio,
  issue
};
