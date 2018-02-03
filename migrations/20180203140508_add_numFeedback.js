
exports.up = knex => (
  knex.schema.table('projects', (t) => {
    t.integer('num_feedback').defaultTo(0);
  })
);

exports.down = knex => (
  knex.schema.table('projects', (t) => {
    t.dropColumn('num_feedback');
  })
);
