
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', (table) => {
      table.integer('estimated_time');
    }),
    knex.schema.table('items', (table) => {
      table.integer('quantity');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', (table) => {
      table.dropColumn('estimated_time');
    }),
    knex.schema.table('items', (table) => {
      table.dropColumn('quantity');
    }),
  ]);
};
