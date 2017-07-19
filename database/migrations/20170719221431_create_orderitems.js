
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('orderitems', (table) => {
        table.integer('order_id').references('id').inTable('orders');
        table.integer('item_id').references('id').inTable('items');
        table.integer('quantity');
        table.decimal('paid_each');
      })
    ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orderitems');
};

