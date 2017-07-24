const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

/*
  ### Orderitems table ###
  A module that returns an object with the results of the following functions:
  - find_by_order(id)
  - find_by_order_id(order_id)
  - create_orderitems(order_id, item_id, quantity, paid_each)
  - delete_orderitems(id)
*/

module.exports = function(knex) {

  function find_by_id(id) {
    return new Promise((resolve, reject) => {
      knex('orderitems')
      .select('*')
      .where({id: id})
      .limit(1)
      .then((rows) => {
        const item = rows[0];
        if (item) {
          return resolve(item);
        }
        else {
          return reject();
        }
      })
      .catch((error) => reject(error));
    });
  } // end of find_by_id(id) function

  function find_by_order_id(order_id) {
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

  function update_orderitems(id, type_array, value_array) {
    return new Promise((resolve, reject) => {
        let update_info = {};
        for (let i = 0; i < type_array.length; i++) {
          const type = type_array[i];
          const value = value_array[i];
          update_info[type] = value;
        }
        resolve(update_info);
    })
    .then((update_info) => {
      return (
        knex('orderitems')
        .where({id: id})
        .update(update_info)
      );
    });
  } // end of update_item function

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

function delete_orderitems(id) {
    return new Promise((resolve, reject) => {
      knex('orderitems')
      .where({id: id})
      .del()
      .then()
    });
  }

  return {
    find_by_id: find_by_id,
    find_by_order_id: find_by_order_id,
    update_orderitems: update_orderitems,
    create_orderitems: create_orderitems,
    delete_orderitems: delete_orderitems
  }

} // end of module.exports