
exports.up = (knex) => {
  return knex.schema.table('types', (table) => {
    table.renameColumn('id', 'type_id');
  });
};

exports.down = (knex) => {
  return knex.schema.table('types', (table) => {
    table.renameColumn('type_id', 'id');
  });
};
