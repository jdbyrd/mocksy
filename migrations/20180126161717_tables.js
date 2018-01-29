exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name').unique();
    t.string('password');
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }),

  knex.schema.createTable('projects', (t) => {
    t.increments('id').unsigned().primary();
    t.string('title');
    t.string('url');
    t.string('github');
    t.text('text');
    t.text('contributor');
    t.integer('user_id').references('users.id');
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }),

  knex.schema.createTable('feedback', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('upvotes');
    t.integer('downvotes');
    t.text('text');
    t.integer('user_id').references('users.id');
    t.integer('project_id').references('projects.id');
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }),

  knex.schema.createTable('votes', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').references('users.id');
    t.integer('feedback_id').references('feedback.id');
    t.boolean('vote');
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }),

  knex.schema.createTable('tags', (t) => {
    t.increments('id').unsigned().primary();
    t.string('tag');
  }),

  knex.schema.createTable('project_tags', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('tag_id').references('tags.id');
    t.integer('project_id').references('projects.id');
  }),

  knex.schema.createTable('review_type', (t) => {
    t.increments('id').unsigned().primary();
    t.string('options');
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('review_type'),
  knex.schema.dropTable('project_tags'),
  knex.schema.dropTable('tags'),
  knex.schema.dropTable('votes'),
  knex.schema.dropTable('feedback'),
  knex.schema.dropTable('projects'),
  knex.schema.dropTable('users')
]);
