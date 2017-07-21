const settings = require("./settings");
const knex = require('knex') (require('./knexfile').development);

const name = "Richard";
const phone = "14164523434";
const items = [ "BMT", "Special", "Colorful"];
const quantities = [ 4, 5, 6];

const promises = () => {
  return knex.select('*')
    .from('items')
    .then((items_object) => {
      return items_object;
    })
}

promises()
  .then((items_object) => {
    let total = 0;
    let item_ids = [];
    let item_prices = [];

    items.map((aItem) => {
      for (let item of Object.keys(items_object)) {
        if (aItem == items_object[item]['name']) {
          const _item = items_object[item];

          item_ids.push(_item.id);
          item_prices.push(_item.item_price);
          total += +(_item.item_price);
        }
      }
    });

    // knex('orders')
    //   .insert([{
    //     'cost': total,
    //     'name': name,
    //     'phone_number': phone,
    //     'status': 'concluded'
    //   }])
    //   .asCallback((err, rows) => {
    //     if (err) {
    //       return console.error(err);
    //     }
    //   });


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

      const promises2 = (i) => {
        return promises1()
          .then((result) => {
            knex('orderitems')
              .insert([{
                'order_id': result,
                'item_id': item_ids[i],
                'quantity': quantities[i],
                'paid_each': item_prices[i]
              }])
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


      let promises_array = [];

      for (let item of items) {
          let i = items.indexOf(item);
        promises_array.push(promises2(i));
      }
let j = 0;
      Promise.all(promises_array).then((value) => {
        console.log('j', j);
        console.log(value);
        j++;
      })




    // for (let i = 0; i < items.length; i++) {



    //   promises1()
    //     .then((result) => {
    //       knex('orderitems')
    //         .insert([{
    //           'order_id': result,
    //           'item_id': item_ids[i],
    //           'quantity': quantities[i],
    //           'paid_each': item_prices[i]
    //         }])
    //         .asCallback((err, rows) => {
    //           if (err) {
    //             return console.error(err);
    //           }
    //         });
    //     })
    //     .catch((err) => {
    //       console.error('error: ', err);
    //     })
    // }
    console.log('finish...')
  })

