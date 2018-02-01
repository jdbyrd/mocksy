
exports.up = (knex, Promise) => Promise.all([
  knex.schema.table('feedback', (t) => {
    t.integer('type_id').references('types.id');
  }),
  knex.schema.alterTable('projects', (t) => {
    t.unique('url');
  }),
  knex('types').insert([
    { options: 'General feedback' },
    { options: 'Feature suggestion' },
    { options: 'Bug' },
    { options: 'Code review' },
    { options: 'Design critique' },
    { options: 'Other...' }
  ]),
]);

exports.down = (knex, Promise) => Promise.all([
  knex('types').del(),
  knex.schema.alterTable('projects', (t) => {
    t.dropUnique('url');
  }),
  knex.schema.table('feedback', (t) => {
    t.dropColumn('type_id');
  }),
]);
