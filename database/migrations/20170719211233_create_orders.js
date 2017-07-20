
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('orders', (table) => {
        table.increments('id');
        table.dateTime('order_date');
        table.decimal('cost');
        table.string('status').notNullable();
        table.integer('phone_number').notNullable();
      })
    ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
