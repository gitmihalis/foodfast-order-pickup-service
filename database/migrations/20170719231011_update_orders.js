
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('orders', (table) => {
      table.string('phone_number').alter();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('orders', (table) => {
      table.integer('phone_number').alter();
    })
  ]);
};
