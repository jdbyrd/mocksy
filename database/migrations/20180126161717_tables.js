exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').unique();
    table.string('password');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }),

  knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('title');
    table.string('url');
    table.string('github');
    table.text('text');
    table.text('contributor');
    table.integer('user_id').references('users.id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }),

  knex.schema.createTable('feedback', (table) => {
    table.increments();
    table.integer('upvotes');
    table.integer('downvotes');
    table.text('text');
    table.integer('user_id').references('users.id');
    table.integer('project_id').references('projects.id');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  }),

  knex.schema.createTable('tags', (table) => {
    table.increments();
    table.string('tag');
  }),

  knex.schema.createTable('project_tags', (table) => {
    table.increments();
    table.integer('tag_id').references('tags.id');
    table.integer('project_id').references('projects.id');
  }),

  knex.schema.createTable('review_type', (table) => {
    table.increments();
    table.string('options');
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
  knex.schema.dropTable('projects'),
  knex.schema.dropTable('feedback'),
  knex.schema.dropTable('tags'),
  knex.schema.dropTable('project_tags'),
  knex.schema.dropTable('review_type')
]);
