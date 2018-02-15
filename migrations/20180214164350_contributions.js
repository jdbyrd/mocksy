exports.up = knex => (
  knex.schema.table('contributors', (t) => {
    t.text('contributor');
    t.dropColumn('user_id');
  })
);

exports.down = knex => (
  knex.schema.table('contributors', (t) => {
    t.integer('user_id').references('users.id');
    t.dropColumn('contributor');
  })
);
