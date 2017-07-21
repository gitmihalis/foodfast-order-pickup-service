
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orderitems')
    .del()
    .then(function () {
      return Promise.all([
      knex('orders')
        .del()
        .then(function () {
          return knex('orders').insert([
            {id: 1, cost: 24, status: 'pending', phone_number: 14164527777, estimated_time: 10, name: "John"},
            {id: 2, cost: 54, status: 'pending', phone_number: 14164526666, estimated_time: 10, name: "Jack"},
            {id: 3, cost: 30, status: 'pending', phone_number: 14164525555, estimated_time: 10, name: "Jeremy"},
            {id: 4, cost: 31, status: 'pending', phone_number: 14164524444, estimated_time: 10, name: "Julia"},
            {id: 5, cost: 72, status: 'pending', phone_number: 14164528888, estimated_time: 10, name: "Joanne"}
          ]);
        }),
      knex('items')
        .del()
        .then(function () {
          return knex('items').insert([
            {id: 1, quantity: 100, name: 'Eduardo Burger', description: 'A juicy sirloin burger on a sesame bun topped with: cheddar cheese, bacon, lettuce, tomato, and caramelized onions.', item_price: 9, picture_file: '/images/Burger.jpg'},
            {id: 2, quantity: 100, name: 'Twilio Salad', description: 'Tasty lettuce chopped and combined with seasonal vegetables, feta, and homemade croutons. Currently featuring spinach, strawberries, and shredded carrots.', item_price: 7.5, picture_file: '/images/Salad.jpg'},
            {id: 3, quantity: 100, name: 'Mihalis Soup', description: 'A custom blend of fresh garden vegetables, depending on the season. Currently featuring carrots, squash, and oregano.', item_price: 6.5, picture_file: '/images/Soup.jpg'}
            {id: 3, quantity: 100, name: 'Mihalis Soup', description: 'A moist carrot cake with cream cheese icing and layers of caramel. Topped with whipped cream.', item_price: 6.0, picture_file: '/images/Cake.jpg'}
          ]).then(function() {
            return knex('orderitems')
              .then(function () {
                return knex('orderitems').insert([
                  {id: 1, order_id: 1, item_id:1, quantity: 2, paid_each: 12},
                  {id: 2, order_id: 2, item_id:1, quantity: 2, paid_each: 12},
                  {id: 3, order_id: 2, item_id:2, quantity: 2, paid_each: 15},
                  {id: 4, order_id: 3, item_id:3, quantity: 5, paid_each: 6},
                  {id: 5, order_id: 4, item_id:1, quantity: 1, paid_each: 12},
                  {id: 6, order_id: 4, item_id:2, quantity: 1, paid_each: 15},
                  {id: 7, order_id: 4, item_id:3, quantity: 1, paid_each: 6},
                  {id: 8, order_id: 5, item_id:2, quantity: 2, paid_each: 15},
                  {id: 9, order_id: 5, item_id:3, quantity: 1, paid_each: 6},
                  {id: 10, order_id: 5, item_id:1, quantity: 3, paid_each: 12}
                ]);
              })
          });
        })
    ])})
};
