
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('clients', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
      })
    ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clients');
};
