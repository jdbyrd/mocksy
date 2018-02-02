const knex = require('./db');

const votes = (votes_id, vote) => {
  knex('votes')
    .where('votes_id', '=', votes_id)
    .update({ vote });
}

module.exports = {
  votes
};
