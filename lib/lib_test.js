const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

const Item = require('./item')(knex);
const Table = require('./table')(knex);

/*Item.find_by_id(1)
  .then((item) => {
    console.log (item);
  })
  .catch((err) => {
    console.log(err);
  });

Item.find_by_name('Cake')
  .then((item) => {
    console.log (item);
  })
  .catch((err) => {
    console.log(err);
  });

Item.create_item('BLT', 'Bacon, lettuce and tomato', 7, 0, 'bmt.png', 99)
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

Item.update_item(29, ['discount', 'quantity'], [null, 100]);

Item.delete_item(29);*/

Table.find_all('items')
  .then((table) => {
    console.log (table);
  })
  .catch((err) => {
    console.log(err);
  });
