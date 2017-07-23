/*
  First seed of the following tables:
  - items
  - orders
  - orderitems
*/

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orderitems')
    .del()
    .then(function() {return knex.raw('ALTER SEQUENCE orderitems_id_seq RESTART WITH 1')})
    .then(function () {
      return Promise.all([
      knex('orders')
        .del()
        .then(function() {return knex.raw('ALTER SEQUENCE orders_id_seq RESTART WITH 1')})
        .then(function () {
          return knex('orders').insert([
            {cost: 18, status: 'pending', phone_number: 14164527777, estimated_time: 5, name: "John Doe"},
            {cost: 27, status: 'pending', phone_number: 14164526666, estimated_time: 10, name: "Jack Black"},
            {cost: 32.5, status: 'pending', phone_number: 14164525555, estimated_time: 8, name: "Jeremy Irons"},
            {cost: 20, status: 'pending', phone_number: 14164524444, estimated_time: 10, name: "Julia Roberts"},
            {cost: 64.5, status: 'pending', phone_number: 14164528888, estimated_time: 15, name: "Jack Johnson"}
          ]);
        }),
      knex('items')
        .del()
        .then(function() {return knex.raw('ALTER SEQUENCE items_id_seq RESTART WITH 1')})
        .then(function () {
          return knex('items').insert([
            {quantity: 100, name: 'Eduardo Burger', description: 'A juicy sirloin burger on a sesame bun topped with: cheddar cheese, bacon, lettuce, tomato, and caramelized onions.', item_price: 9, picture_file: '/images/Burger.jpg'},
            {quantity: 100, name: 'Twilio Salad', description: 'Tasty lettuce chopped and combined with seasonal vegetables, feta, and homemade croutons. Currently featuring spinach, strawberries, and shredded carrots.', item_price: 7.5, picture_file: '/images/Salad.jpg'},
            {quantity: 100, name: 'Mihalis Soup', description: 'A custom blend of fresh garden vegetables, depending on the season. Currently featuring carrots, squash, and oregano.', item_price: 6.5, picture_file: '/images/Soup.jpg'},
            {quantity: 100, name: 'Laura Cake', description: 'A moist carrot cake with cream cheese icing and layers of caramel. Topped with whipped cream.', item_price: 6.0, picture_file: '/images/Cake.jpg'}
          ]).then(function() {
            return knex('orderitems')
              .then(function () {
                return knex('orderitems').insert([
                  {order_id: 1, item_id:1, quantity: 2, paid_each: 9},
                  {order_id: 2, item_id:1, quantity: 2, paid_each: 7.5},
                  {order_id: 2, item_id:4, quantity: 2, paid_each: 6},
                  {order_id: 3, item_id:3, quantity: 5, paid_each: 6.5},
                  {order_id: 4, item_id:4, quantity: 1, paid_each: 6},
                  {order_id: 4, item_id:2, quantity: 1, paid_each: 7.5},
                  {order_id: 4, item_id:3, quantity: 1, paid_each: 6.5},
                  {order_id: 5, item_id:4, quantity: 3, paid_each: 6},
                  {order_id: 5, item_id:3, quantity: 3, paid_each: 6.5},
                  { order_id: 5, item_id:1, quantity: 3, paid_each: 9}
                ]);
              })
          });
        })
    ])})
};
