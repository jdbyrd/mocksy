
exports.up = knex => knex.schema.table('feedback', (t) => {
  t.boolean('has_images').defaultTo(false).notNullable();
});

exports.down = knex => knex.schema.table('feedback', (t) => {
  t.dropColumn('has_images');
});
