module.exports = function(knex) {

  function find(id) {
    return new Promise((resolve, reject) => {
      knex('items')
      .select('*')
      .where({id: id})
      .limit(1)
      .then((rows) => {
        const item = rows[0];
        if (item) {
          return resolve(user);
        }
        else {
          return reject();
        }
      })
      .catch((error) => reject(error));
    })
  } // end of find(id)

} // end ofmodule.exports