
exports.up = (knex) => {
  return knex.schema.table('feedback', (table) => {
    table.dropColumn('upvotes');
    table.dropColumn('downvotes');
    table.integer('up').defaultTo(0);
    table.integer('down').defaultTo(0);
  });
};

exports.down = (knex) => {
  return knex.schema.table('feedback', (table) => {
    table.dropColumn('up');
    table.dropColumn('down');
    table.integer('upvotes');
    table.integer('downvotes');
  });
};
