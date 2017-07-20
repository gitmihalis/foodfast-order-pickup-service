
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orderitems', (table) => {

      table.integer('id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.table('milestones', (table) => {
    table.dropColumn('id');
  }) ]);
};
