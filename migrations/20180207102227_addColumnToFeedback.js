exports.up = knex => (
  knex.schema.table('feedback', (t) => {
    t.boolean('notified').defaultTo(false);
  })
);

exports.down = knex => (
  knex.schema.table('feedback', (t) => {
    t.dropColumn('notified');
  })
);
