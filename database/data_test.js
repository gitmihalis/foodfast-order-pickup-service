const settings = require("./settings");
const knex = require('knex') (require('./knexfile').development);

const name = "Laura";
const phone = "14164526666";
const items = [ "BMT", "Special", "Colorful"];
const quantities = [ 3, 3, 3];

const promises = () => {
  // retrieve all of records of items' table
  return knex.select('*')
    .from('items')
    .then((items_object) => {
      return items_object;
    });
}

promises()
  .then((items_object) => {
    let total = 0;
    let item_ids = [];
    let item_prices = [];

    items.map((aItem) => {
      let i = 0;
      for (let item of Object.keys(items_object)) {
        // push to item_ids and item_prices when match the item.name
        if (aItem == items_object[item]['name']) {
          const _item = items_object[item];
          item_ids.push(_item.id);
          item_prices.push(_item.item_price);
          total += +(_item.item_price * quantities[i]);
        }
        i++;
      }
    });

    // create a new record in orders table
    knex('orders')
      .insert([{
        'cost': total,
        'name': name,
        'phone_number': phone,
        'status': 'concluded'
      }])
      .returning('id')
      .then(function (id) {
        for (let item of items) {
          let i = items.indexOf(item);
          // create a new record of each item of the order
          knex('orderitems')
            .insert([{
              'order_id': JSON.parse(id),
              'item_id': item_ids[i],
              'quantity': quantities[i],
              'paid_each': item_prices[i]
            }])
            .asCallback((err, rows) => {
              if (err) {
                return console.error(err);
              }
            });
        }
      });
  });