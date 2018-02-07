
exports.up = knex => knex.schema.table('tags', t => t.integer('project_id').references('projects.id'));

exports.down = knex => knex.schema.table('tags', t => t.dropColumn('project_id'));
