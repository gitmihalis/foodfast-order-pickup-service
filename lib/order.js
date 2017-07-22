const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

module.exports = function(knex) {

  function find_by_id(id) {
    return new Promise((resolve, reject) => {
      knex('orders')
      .select('*')
      .where({id: id})
      .limit(1)
      .then((rows) => {
        const order = rows[0];
        if (order) {
          return resolve(order);
        }
        else {
          return reject();
        }
      })
      .catch((error) => reject(error));
    })
  } // end of find(id) function

  function find_by_name(name) {
    return new Promise((resolve, reject) => {
      knex('orders')
      .select('*')
      .where({name: name})
      // .limit(1)
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
    })
  } // end of find_by_name(name) function

  function find_by_date(date) {
    return new Promise((resolve, reject) => {
      knex('orders')
      .select('*')
      .whereRaw('??::date = ?', ['order_date', date])
      // .limit(1)
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
    })
  } // end of find_by_date(date) function

  function find_by_phone(phone) {
    return new Promise((resolve, reject) => {
      knex('orders')
      .select('*')
      .where({phone_number: phone})
      // .limit(1)
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
    })
  } // end of find_by_phone(phone) function

  function find_by_status(status) {
    return new Promise((resolve, reject) => {
      knex('orders')
      .select('*')
      .where({status: status})
      // .limit(1)
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
    })
  } // end of find_by_status(status) function

  function create_order(name, cost, status, phone_number, estimated_time) {
    return (
      knex('orders')
      .insert({
        name: name,
        cost: cost,
        status: status,
        phone_number: phone_number,
        estimated_time: estimated_time,
      })
    );
  } // end of create_order function

  function update_order(id, type_array, value_array) {
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
        knex('orders')
        .where({id: id})
        .update(update_info)
      )
    })
  } // end of update_order function

  function delete_order(id) {
    return new Promise((resolve, reject) => {
      knex('orders')
      .where({id: id})
      .del()
      .then()
    })
  }

  return {
    find_by_id: find_by_id,
    find_by_name: find_by_name,
    find_by_date: find_by_date,
    find_by_phone: find_by_phone,
    find_by_status: find_by_status,
    create_order: create_order,
    update_order: update_order,
    delete_order: delete_order
  }

} // end of module.exports

