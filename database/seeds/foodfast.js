
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
      knex('orders')
        .del()
        .then(function () {
          // Inserts seed entries
          return knex('orders').insert([
            {id: 1, order_date: '2017-06-17', cost: 20, status: 'concluded', phone_number: 14164527777},
            {id: 2, order_date: '2017-06-18', cost: 20, status: 'concluded', phone_number: 14164527777},
            {id: 3, order_date: '2017-06-19', cost: 20, status: 'concluded', phone_number: 14164527777},
            {id: 4, order_date: '2017-06-19', cost: 20, status: 'pending', phone_number: 14164527777},
            {id: 5, order_date: '2017-06-19', cost: 50, status: 'pending', phone_number: 14164528888}
          ]);
        }),
      knex('items')
        .del()
        .then(function () {
          return knex('items').insert([
            {id: 1, name: 'Colorful', description: 'Lettuce, carrot, tomato, olive and yellow pepper', item_price: 10, picture_file: 'colorful.png'},
            {id: 2, name: 'BMT', description: 'Bacon, lettuce and tomato', item_price: 15, picture_file: 'bmt.png'},
            {id: 3, name: 'Special', description: 'Olive, carrot, bacon, lettuce, mushroom and tomato', item_price: 20, picture_file: 'special.png'}
          ]);
        }),
      knex('orderitems')
        .del()
        .then(function () {
          return knex('orderitems').insert([
            {order_id: 1, item_id:1, quantity: 2, paid_each: 10, id: 1},
            {order_id: 2, item_id:1, quantity: 2, paid_each: 10, id: 2},
            {order_id: 2, item_id:2, quantity: 2, paid_each: 15, id: 3},
            {order_id: 3, item_id:3, quantity: 5, paid_each: 20, id: 4},
            {order_id: 4, item_id:1, quantity: 1, paid_each: 10, id: 5},
            {order_id: 4, item_id:2, quantity: 1, paid_each: 15, id: 6},
            {order_id: 4, item_id:3, quantity: 1, paid_each: 20, id: 7},
            {order_id: 5, item_id:2, quantity: 2, paid_each: 15, id: 8},
            {order_id: 5, item_id:3, quantity: 1, paid_each: 20, id: 9},
            {order_id: 5, item_id:1, quantity: 3, paid_each: 10, id: 10}
          ]);
        })
    ])
};
