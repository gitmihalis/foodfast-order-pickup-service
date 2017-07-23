const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

/*
  A module that returns an object with the results of the following functions:
  - find_by_id(order_id)
  - create_orderitems(order_id, item_id, quantity, paid_each)
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
        const order = rows;
        if (order) {
          return resolve(order);
        }
        else {
          return reject();
        }
      })
      .catch((error) => reject(error));
    });
  } // end of find_by_id(id) function

function create_orderitems(order_id, item_id, quantity, paid_each) {
    return (
      knex('orderitems')
      .insert({
        order_id: order_id,
        item_id: item_id,
        quantity: quantity,
        paid_each: paid_each,
      })
    );
  } // end of create_orderitems function


  return {
    find_by_id: find_by_id,
    create_orderitems: create_orderitems
  }

} // end of module.exports