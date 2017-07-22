const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

const Item = require('./item')(knex);
const Table = require('./table')(knex);
const Order = require('./order')(knex);

/*
 * ORDER
 */

/*Order.find_by_id(1)
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })

Order.find_by_name('Julia')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })*/

/*Order.find_by_date('2017-07-21')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })*/


/*Order.find_by_phone('14164527777')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })
*/
/*Order.find_by_status('pending')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })*/

/*Order.create_order('John', 34, 'pending', '14164528989', 19)
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });*/

// Order.update_order(60, ['status', 'phone_number', 'estimated_time'], ['complete', '14164527676', 5]);

// Order.delete_order(60);

/*
 * ITEM
 */

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

/*Table.find_all('items')
  .then((table) => {
    console.log (table);
  })
  .catch((err) => {
    console.log(err);
  });*/
