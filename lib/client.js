const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);
const bcrypt = require('bcrypt');

/*
  ### Clients table ###
  A module that returns an object with the results of the following functions:
  - find_by_id(id)
  - find_by_name(name)
  - find_by_email(email)
  - checkEmailUniqueness(email)
  - authenticate(email, password)
  - create_client(email, password, name)
  - update_client(id, newEmail, newPassword)
  - delete_client(id)
*/

module.exports = function(knex) {

  function find_by_id(id) {
    return new Promise((resolve, reject) => {
      knex('clients')
      .select('*')
      .where({id: id})
      .then((rows) => {
        const client = rows[0];
        if (client) {
          return resolve(client);
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
      knex('clients')
      .select('*')
      .where({name: name})
      .limit(1)
      .then((rows) => {
        const client = rows[0];
        if (client) {
          return resolve(client);
        }
        else {
          return reject();
        }
      })
      .catch((error) => reject(error));
    });
  } // end of find_by_name(name) function

  function find_by_email(email) {
    return new Promise((resolve, reject) => {
      knex('clients')
      .select('*')
      .where({email: email})
      .limit(1)
      .then((rows) => {
        const client = rows[0];
        return resolve(client);
      })
      .catch((error) => reject(error));
    });
  } // end of find_by_email(email) function

  function checkEmailUniqueness(email) {
    return new Promise((resolve, reject) => {
      find_by_email(email)
      .then((client) => {
        if (client) {
          return reject({
            type: 409,
            message: 'email has already been used'
          });
        }
        else {
          return resolve(email);
        }
      })
    });
  } // end of checkEmailUniqueness(email) function

  function authenticate(email, password) {
    return new Promise((resolve, reject) => {
      find_by_email(email)
      .then((client) => {
        if (!client) {
          return reject({
            type: 409,
            message: 'bad credentials'
          });
        }
        bcrypt.compare(password, client.password)
        .then((passwordsMatch) => {
          if (passwordsMatch) {
            return resolve(client);
          }
          else {
            // If the passwords don't match, return a rejected promise with an
            // error.
            return reject({
              type: 409,
              message: 'bad credentials'
            });
          }
        })
      })
      .catch((error) => reject(error));
    })
  }

  function create_client(email, password, name) {
    return (
      checkEmailUniqueness(email)
      .then((email) => {
        return bcrypt.hash(password, 10);
      })
      .then((password_digest) => {
        return knex('clients')
        .insert({
          email: email,
          password: password_digest,
          name: name,
        })
      })
    );
  } // end of create_client function

  function update_client(id, newEmail, newPassword) {
    let promises = []

    // If the email needs to be updated, we need to check for uniqueness
    if (newEmail) {
      promises.push(checkEmailUniqueness(newEmail))
    }
    else {
      promises.push(Promise.resolve(false))
    }

    // If the password needs to be updated, we must encrypt it
    if (newPassword) {
      promises.push(bcrypt.hash(newPassword, 10))
    }
    else {
      promises.push(Promise.resolve(false))
    }

    // Now we run all promises and get .then results in an array
    // If anything breaks, .catch will be called
    return Promise.all(promises).then((emailAndPasswordDigest) => {
      const email = emailAndPasswordDigest[0]
      const password_digest = emailAndPasswordDigest[1]

      const update_client = {}
      if (email) update_client.email = email
      if (password_digest) update_client.password = password_digest

      return knex('clients')
        .update(update_client)
        .where({id: id})
    })
  } // end of update_client(id, newEmail, newPassword)

  function delete_client(id) {
    return new Promise((resolve, reject) => {
      knex('clients')
      .where({id: id})
      .del()
      .then()
    });
  } // end of delete_client

  return {
    find_by_id: find_by_id,
    find_by_name: find_by_name,
    find_by_email: find_by_email,
    checkEmailUniqueness: checkEmailUniqueness,
    authenticate: authenticate,
    create_client: create_client,
    update_client: update_client,
    delete_client: delete_client
  }

} // end of module.exports

