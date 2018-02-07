
exports.up = knex => knex.schema.table('users', t => t.text('bio'));

exports.down = knex => knex.schema.table('users', t => t.dropColumn('bio'));
