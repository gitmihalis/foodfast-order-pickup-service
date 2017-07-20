const settings = require("./settings");
const knex = require('knex') (require('./knexfile').development);

const name = "Laura";
const phone = "14164520000";
const items = [ "BMT", "Special"];
const quantities = [ 3, 4];

const promises = items.map((item) => {
  return knex.select('item_price')
    .from('items')
    .where('name', '=', item)
    .then((rows) => {
      return rows[0].item_price;
    });
});

Promise.all(promises)
  .then((prices) => {
    let total = 0;
    prices.map((price) => {
      total += +price;
    });

    knex('orders')
      .insert([{
        'cost': total,
        'name': name,
        'phone_number': phone,
        'status': 'concluded'
      }])
      .asCallback((err, rows) => {
        if (err) {
          return console.error(err);
        }
      });
  })

const promises1 = () => {
  return new Promise((resolve, reject) => {
    knex.select('id')
      .from('orders')
      .orderBy('id', 'desc')
      .limit(1)
      .then((rows) => {
        return resolve(rows[0].id);
      });

  })
}

for (let i = 0; i < items.length; i++) {
  promises1()
    .then((result) => {
      // console.log("result> " ,result);
      knex('orderitems')
        .insert([
          'order_id': result,
          'item_id': items[i],
          'quantity': quantities[i],
          'paid_each':
        ])
        .asCallback((err, rows) => {
          if (err) {
            return console.error(err);
          }
        });
    })
    .catch((err) => {
      console.error('error: ', err);
    })

}

