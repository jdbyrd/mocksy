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

const feedback = (feedbackId, text) => {
  knex('feedback')
    .where('id', '=', feedbackId)
    .update({ text })
    .then(() => console.log('updated feedback text'));
};

const project = (projectId, text) => {
  knex('projects')
    .where('id', '=', projectId)
    .update({ text })
    .then(() => console.log('updated project text'));
};

module.exports = {
  vote,
  incrementFeedbackUp,
  incrementFeedbackDown,
  decrementFeedbackUp,
  decrementFeedbackDown,
  feedback,
  project
};
