
exports.up = (knex, Promise) => knex.schema.table('users', t => new Promise(() => t.dropColumn('password')));

exports.down = (knex, Promise) => knex.schema.table('users', t => new Promise(() => t.string('password')));
