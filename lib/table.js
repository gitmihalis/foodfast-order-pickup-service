const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

/*
  A module that returns an object with the result of the following function:
  - find_all(table) => A function that receives one argument (table's name),
    and search for all contents of the table.
*/

module.exports = function(knex) {

  function find_all(table) {
    return new Promise((resolve, reject) => {
      knex(table)
      .select('*')
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
    });
  } // end of find_all function

  return {
    find_all: find_all
  }

} // end of module.exports

