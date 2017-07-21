const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

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
    })
  } // end of find(id) function

  function find_by_name(name) {
    return new Promise((resolve, reject) => {
      knex('items')
      .select('*')
      .where({name: name})
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
    })
  } // end of find_by_name(name) function

  function create_item(name, description, item_price, discount, picture_file, quantity) {
    return (
      knex('items')
      .insert({
        name: name,
        description: description,
        item_price: item_price,
        discount: discount,
        picture_file,
        quantity
      });
    );
  } // end of create_item function

  return {
    find: find,
    find_by_name: find_by_name,
    create_item: create_item
  }

} // end of module.exports

