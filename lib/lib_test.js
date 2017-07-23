const settings = require("../database/settings");
const knex = require('knex') (require('../database/knexfile').development);

const Item = require('./item')(knex);
const Table = require('./table')(knex);
const Order = require('./order')(knex);
const Client = require('./client')(knex);
const Orderitems = require('./orderitems')(knex);

/*
 * ORDER *****
 */

  Order.find_by_id(1)
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })

Order.find_by_name('Julia Roberts')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })

Order.find_by_date('2017-07-22')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })


Order.find_by_phone('14164527777')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })

Order.find_by_status('pending')
  .then((order) => {
    console.log(order);
  })
  .catch((err) => {
    console.log(err);
  })

Order.create_order('John Wayne', 34, 'pending', '14164528989', 19)
  .returning('id')
  .then((id) => { console.log('id is ', id)})
  .catch((err) => {
    console.log(err);
  });

Order.create_order('John John', 25, 'pending', '14164527575', 12)
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

Order.update_order(7, ['status', 'phone_number', 'estimated_time'], ['complete', '14164527676', 5]);

Order.delete_order(6);

/*
 * ITEM *****
 */

Item.find_by_id(1)
  .then((item) => {
    console.log (item);
  })
  .catch((err) => {
    console.log(err);
  });

Item.find_by_name('Laura Cake')
  .then((item) => {
    console.log (item);
  })
  .catch((err) => {
    console.log(err);
  });

Item.create_item('Pizza', 'Bacon, lettuce and tomato', 7, 0, 'bmt.png', 99)
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

Item.update_item(5, ['discount', 'quantity'], [null, 100]);

Item.delete_item(5);

/*
 * TABLE *****
 */

Table.find_all('orderitems')
  .then((table) => {
    console.log (table);
  })
  .catch((err) => {
    console.log(err);
  });

/*
 * CLIENT *****
 */

Client.create_client('jFonda@example.com', 'password', 'Jane Fonda');

Client.find_by_id(2)
  .then((client) => {console.log(client)})
  .catch((err) => {console.log(err)})

Client.find_by_name('John Doe')
  .then((client) => {console.log(client)})
  .catch((err) => {console.log(err)})

Client.find_by_email('jFonda@example.com')
  .then((client) => {console.log(client)})
  .catch((err) => {console.log(err)})

Client.update_client(1, 'johnDoe@example.com', 'password');

Client.delete_client(2);

Client.authenticate('jFonda@example.com', 'password')
  .then((client) => {console.log(client)})
  .catch((err) => {console.log(err)})

Client.authenticate('a1@a1.com', 'a1')
  .then((client) => {console.log(client)})
  .catch((err) => {console.log(err)})

/*
 * ORDERITEMS *****
 */

Orderitems.find_by_order_id(4)
  .then((orderitems) => {console.log(orderitems)})
  .catch((err) => {console.log(err)})

Orderitems.create_orderitems(5, 1, 3, 6.5)
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

Orderitems.find_by_id(4)
  .then((orderitems) => {console.log(orderitems)})
  .catch((err) => {console.log(err)})

Orderitems.update_orderitems(11, ['item_id', 'quantity'], [2, 7]);


