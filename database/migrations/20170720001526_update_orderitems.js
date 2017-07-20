
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orderitems', (table) => {
      table.increments('id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('orderitems', (table) => {
    table.dropColumn('id');
  }) ]);
};
