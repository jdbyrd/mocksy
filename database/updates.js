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
  knex('feedback')
    .where('id', '=', feedbackId)
    .update({ notified })
    .then(() => console.log('user read push notification'));
};

module.exports = {
  vote,
  incrementFeedbackUp,
  incrementFeedbackDown,
  decrementFeedbackUp,
  decrementFeedbackDown,
  wasNotified
};
