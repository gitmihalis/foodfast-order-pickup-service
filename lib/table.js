const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

module.exports = function(knex) {

  function find_all(table) {
    return new Promise((resolve, reject) => {
      knex(table)
      .select('*')
      // .where({id: id})
      // .limit(1)
      .then((rows) => {
        const table = rows;
        if (table) {
          return resolve(table);
        }
        else {
          return reject();
        }
      })
      .catch((error) => reject(error));
    })
  } // end of find(id) function

  return {
    find_all: find_all
  }

} // end of module.exports

