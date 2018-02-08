exports.up = knex => (
  knex.schema.table('feedback', (t) => {
    t.boolean('marked').defaultTo(null);
  })
);

exports.down = knex => (
  knex.schema.table('feedback', (t) => {
    t.dropColumn('marked');
  })
);
