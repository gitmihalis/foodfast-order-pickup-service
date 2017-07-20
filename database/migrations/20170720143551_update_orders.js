
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', (table) => {
      table.string('name');
    }),
    knex.schema.alterTable('orders', (table) => {
      table.timestamp('order_date').alter().defaultTo(knex.fn.now());
    }),
    knex.schema.table('items', (table) => {
      table.decimal('discount');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', (table) => {
      table.dropColumn('name');
      table.dropColumn('order_date');
    }),
    knex.schema.table('orderitems', (table) => {
      table.dropColumn('id');
      table.dropColumn('order_id');
      table.dropColumn('item_id');
    }),
    knex.schema.table('items', (table) => {
      table.dropColumn('discount');
    }),
  ]);
};
