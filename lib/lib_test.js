const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

const Item = require('./item')(knex);

/*Item.find_by_id(1)
  .then((item) => {
    console.log (item);
  })
  .catch((err) => {
    console.log(err);
  });

Item.find_by_name('Special')
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
  });*/

Item.update_item(27, ['discount', 'quantity'], [null, 99]);


