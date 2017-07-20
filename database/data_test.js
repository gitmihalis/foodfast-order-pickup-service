const settings = require("./settings");
const knex = require('knex') (require('./knexfile').development);

const name = "Laura";
const phone = "14164520000";
const items = [ "BMT", "Special"];
const quantities = [ 3, 4];

// const prices = [];

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

    /*knex('orders')
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
    });*/


          // console.log('a item object', items_object[item]['name']);
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
    console.log('finish...')
  })

// const promises = items.map((item) => {
//   return knex.select('item_price')
//     .from('items')
//     .where('name', '=', item)
//     .then((rows) => {
//       return {"item_price":rows[0].item_price, "item_id":rows[0].id};
//     });
// });

// Promise.all(promises)

//   .then((prices) => {
//     console.log('prices', prices);
//     let total = 0;
//     prices.map((price) => {
//       console.log('price', price)
//       // prices.push(price);
//       total += +price;
//     });

    /*knex('orders')
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
      });*/


    // for (let i = 0; i < items.length; i++) {
    //   const promises1 = () => {
    //     return new Promise((resolve, reject) => {
    //       knex.select('id')
    //         .from('orders')
    //         .orderBy('id', 'desc')
    //         .limit(1)
    //         .then((rows) => {
    //           return resolve(rows[0].id);
    //         });

    //     })
    //   }
    //   promises1()
    //     .then((result) => {
    //       // console.log("result> " ,result);
    //       knex('orderitems')
    //         .insert([{
    //           'order_id': result,
    //           'item_id': items[i],
    //           'quantity': quantities[i],
    //           'paid_each': prices[i]
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
  // })

/*const promises1 = () => {
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
    }*/

