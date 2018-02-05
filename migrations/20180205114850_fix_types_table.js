
exports.up = (knex, Promise) => Promise.all([
  knex('types').where('options', 'Bug').del(),
  knex('types').insert({ id: 3, options: 'Bug report' }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex('types').where('options', 'Bug report').del(),
  knex('types').insert({ id: 3, options: 'Bug' }),
]);
