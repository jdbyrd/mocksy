exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('contributors', (t) => {
      t.increments('id').unsigned().primary();
      t.integer('user_id').references('users.id');
      t.integer('project_id').references('projects.id');
    }),
    knex.schema.table('projects', (t) => {
      t.dropColumn('contributor');
    }),
    knex.schema.renameTable('review_type', 'types'),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.renameTable('types', 'review_types'),
    knex.schema.table('projects', (t) => {
      t.text('contributor');
    }),
    knex.schema.dropTable('contributors'),
  ]);
};
