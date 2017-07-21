const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

const Item = require('./item')(knex);

Item.find(1)
  .then((item) => {
    console.log (item);
  })
  .catch((err) => {
    console.log(err);
  });

Item.find_by_name('Special')
  .then((item) => {
    console.log (item);
  })
  .catch((err) => {
    console.log(err);
  });




/*let item = () => {
  return new Promise((resolve, reject) => {
      // console.log("console log ", value);
    Item.find(1)
    .then((value) => {resolve(value)})
    .catch((err) => {reject(err)})
  })
}

// item().then((value) => {console.log(value)});
const test = item().then((value) => {{return value}});
// console.log(item().then((value) => {return value}));
console.log(test);*/



/*Item.find(1)
    .then((value) => {
      console.log("console log ", value);
      return value;
    })
    .catch((err) => {});*/