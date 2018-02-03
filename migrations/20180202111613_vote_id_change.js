
exports.up = (knex) => {
  return knex.schema.table('votes', (table) => {
    table.renameColumn('id', 'votes_id');
  });
};

exports.down = (knex) => {
  return knex.schema.table('votes', (table) => {
    table.renameColumn('votes_id', 'id');
  });
};
