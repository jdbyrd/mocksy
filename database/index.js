const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    user: process.env.DATABASE_USER || 'user',
    password: process.env.DATABASE_PASSWORD || 'pass',
    database: process.env.DATABASE_NAME || 'mocksy',
  },
});

knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('name').unique();
      table.string('password');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    }).then((table) => {
      console.log('Created Table users', table);
    });
  }
})
  .then(() => {
    knex.schema.hasTable('projects').then((exists) => {
      if (!exists) {
        knex.schema.createTable('projects', (table) => {
          table.increments();
          table.string('title');
          table.string('url');
          table.string('github_url');
          table.text('text');
          table.text('contributor');
          table.integer('userid').references('users.id');
          table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
          table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
        }).then((table) => {
          console.log('Created Table projects', table);
        });
      }
    });
  })
  .then(() => {
    knex.schema.hasTable('feedback').then((exists) => {
      if (!exists) {
        knex.schema.createTable('feedback', (table) => {
          table.increments();
          table.integer('up_votes');
          table.integer('down_votes');
          table.text('text');
          table.integer('userid').references('users.id');
          table.integer('projectid').references('project.id');
          table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
          table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
        }).then((table) => {
          console.log('Created Table feedback', table);
        });
      }
    });
  })
  .then(() => {
    knex.schema.hasTable('tags').then((exists) => {
      if (!exists) {
        knex.schema.createTable('type', (table) => {
          table.increments();
          table.string('name');
        }).then((table) => {
          console.log('Created Table tags', table);
        });
      }
    });
  })
  .then(() => {
    knex.schema.hasTable('project_tags').then((exists) => {
      if (!exists) {
        knex.schema.createTable('project_tags', (table) => {
          table.increments();
          table.integer('tag_id').references('tags.id');
          table.integer('project_id').references('projects.id');
        }).then((table) => {
          console.log('Created Table projects_tags', table);
        });
      }
    });
  })
  .then(() => {
    knex.schema.hasTable('review_type').then((exists) => {
      if (!exists) {
        knex.schema.createTable('review_type', (table) => {
          table.increments();
          table.string('options');
        }).then((table) => {
          console.log('Created Table review_type', table);
        });
      }
    });
  });

module.exports = knex;
