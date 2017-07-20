
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
      knex('orders')
        .del()
        .then(function () {
          // Inserts seed entries
          return knex('orders').insert([
            {cost: 20, status: 'concluded', phone_number: 14164527777, name: "John"},
            {cost: 20, status: 'concluded', phone_number: 14164526666, name: "Jack"},
            {cost: 20, status: 'concluded', phone_number: 14164525555, name: "Jeremy"},
            {cost: 20, status: 'pending', phone_number: 14164524444, name: "Julia"},
            {cost: 50, status: 'pending', phone_number: 14164528888, name: "Joanne"}
          ]);
        }),
      knex('items')
        .del()
        .then(function () {
          return knex('items').insert([
            {name: 'Colorful', description: 'Lettuce, carrot, tomato, olive and yellow pepper', item_price: 10, picture_file: 'colorful.png'},
            {name: 'BMT', description: 'Bacon, lettuce and tomato', item_price: 15, picture_file: 'bmt.png'},
            {name: 'Special', description: 'Olive, carrot, bacon, lettuce, mushroom and tomato', item_price: 20, picture_file: 'special.png'}
          ]);
        }),
      knex('orderitems')
        .del()
        .then(function () {
          return knex('orderitems').insert([
            {order_id: 1, item_id:1, quantity: 2, paid_each: 10},
            {order_id: 2, item_id:1, quantity: 2, paid_each: 10},
            {order_id: 2, item_id:2, quantity: 2, paid_each: 15},
            {order_id: 3, item_id:3, quantity: 5, paid_each: 20},
            {order_id: 4, item_id:1, quantity: 1, paid_each: 10},
            {order_id: 4, item_id:2, quantity: 1, paid_each: 15},
            {order_id: 4, item_id:3, quantity: 1, paid_each: 20},
            {order_id: 5, item_id:2, quantity: 2, paid_each: 15},
            {order_id: 5, item_id:3, quantity: 1, paid_each: 20},
            {order_id: 5, item_id:1, quantity: 3, paid_each: 100}
          ]);
        })
    ])
};
