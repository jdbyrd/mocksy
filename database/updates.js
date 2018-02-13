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

const wasNotified = (feedbackId, notified) => {
  return knex('feedback')
    .where('id', '=', feedbackId)
    .update({ notified });
};

const feedback = (update) => {
  const { feedbackId, text } = update;
  knex('feedback')
    .where('id', '=', feedbackId)
    .update({ text, updated_at: knex.raw('now()') })
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
    .where('name', '=', name)
    .then(() => console.log('updated bio'));
};

const issue = (feedback_id, marked) => {
  knex('feedback')
    .where('id', '=', feedback_id)
    .update({ marked })
    .then(() => console.log('updated issue'));
};

module.exports = {
  vote,
  incrementFeedbackUp,
  incrementFeedbackDown,
  decrementFeedbackUp,
  decrementFeedbackDown,
  wasNotified,
  feedback,
  project,
  bio,
  issue
};
