const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

/*
  A module that returns an object with the results of the following functions:
  - find_by_id(id)
  - find_by_name(name)
  - create_item(name, description, item_price, discount, picture_file, quantity)
  - update_item(id, type_array, value_array)
  - delete_item(id)
*/

module.exports = function(knex) {

  function find_by_id(id) {
    return new Promise((resolve, reject) => {
      knex('items')
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

  function find_by_name(name) {
    return new Promise((resolve, reject) => {
      knex('items')
      .select('*')
      .where('name', 'like', '%' + name)
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
  } // end of find_by_name(name) function

  function create_item(name, description, item_price, discount, picture_file, quantity) {
    return (
      knex('items')
      .insert({
        name: name,
        description: description,
        item_price: item_price,
        discount: discount,
        picture_file: picture_file,
        quantity: quantity
      })
    );
  } // end of create_item function

  function update_item(id, type_array, value_array) {
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
        knex('items')
        .where({id: id})
        .update(update_info)
      );
    });
  } // end of update_item function

  function delete_item(id) {
    return new Promise((resolve, reject) => {
      knex('items')
      .where({id: id})
      .del()
      .then()
    });
  }

  return {
    find_by_id: find_by_id,
    find_by_name: find_by_name,
    create_item: create_item,
    update_item: update_item,
    delete_item: delete_item
  }

} // end of module.exports

