const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

/*
  A module that returns an object with the results of the following functions:
  - find_by_id(order_id)
*/

module.exports = function(knex) {

  function find_by_id(order_id) {
    return new Promise((resolve, reject) => {
      knex('orders')
      .join('orderitems', 'orders.id', '=', 'orderitems.order_id')
      .join('items', 'items.id', '=', 'orderitems.item_id')
      .select('items.name', 'orderitems.quantity', 'orders.id')
      .where({'orders.id': order_id})
      .then((rows) => {
        const orderItems = rows;
        if (orderItems) {
          console.log(orderItems)
          return resolve(orderItems);
        }
        else {
          return reject();
        }
      })
      .catch((error) => reject(error));
    });
  } // end of find_by_id(id) function

  return {
    find_by_id: find_by_id,
  }

} // end of module.exports