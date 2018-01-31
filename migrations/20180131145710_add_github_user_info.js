
exports.up = (knex) => {
  return knex.schema.table('users', (t) => {
    t.string('avatar');
    t.string('display_name');
    t.string('email');
    t.string('github_profile');
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', (t) => {
    t.dropColumn('github_profile');
    t.dropColumn('email');
    t.dropColumn('display_name');
    t.dropColumn('avatar');
  });
};
