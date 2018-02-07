
exports.up = knex => knex.schema.table('votes', t => t.integer('id_project').references('projects.id'));

exports.down = knex => knex.schema.table('users', t => t.dropColumn('project_id'));
