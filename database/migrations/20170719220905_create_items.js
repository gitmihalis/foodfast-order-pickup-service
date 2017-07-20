
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('items', (table) => {
        table.increments('id');
        table.string('name');
        table.string('description');
        table.decimal('item_price');
        table.string('picture_file');
      })
    ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
