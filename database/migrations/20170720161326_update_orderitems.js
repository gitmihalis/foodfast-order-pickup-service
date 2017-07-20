
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('orderitems', (table) => {
      table.integer('order_id').references('id').inTable('orders').alter().onDelete('CASCADE');
    }),
    knex.schema.alterTable('orderitems', (table) => {
      table.integer('item_id').references('id').inTable('items').alter().onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('orderitems', (table) => {
      table.integer('order_id').alter();
    }),
    knex.schema.alterTable('orderitems', (table) => {
      table.integer('item_id').alter();
    })
  ]);
};
