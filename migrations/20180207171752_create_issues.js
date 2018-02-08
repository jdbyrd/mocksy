
exports.up = (knex) => {
  return knex.schema.createTable('issues', (t) => {
    t.increments('issue_id').unsigned().primary();
    t.integer('user_id').references('users.id');
    t.integer('feedback_id').references('feedback.id');
    t.boolean('marked');
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('issues')
};
