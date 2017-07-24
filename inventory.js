// const settings = require("./database/settings");
// const knex = require('knex') (require('./database/knexfile').development);

// const Item = require('./lib/item')(knex);
// const Table = require('./table')(knex);
// const Order = require('./order')(knex);
// const Client = require('./client')(knex);
// const Orderitems = require('./order_items')(knex);
// create_item(name, description, item_price, discount, picture_file, quantity)

function load() {
  $.ajax({
      url: '/inventory_items',
      type: 'GET'
  }).then(function (jsonContent) {
      loadTable(jsonContent);
  });
}

function loadTable(items) {
  let table = $("<table>");
  const th = $("<tr>").addClass("th");
  const _id = $("<td>").addClass("row").text('Id');
  const _name = $("<td>").addClass("row").text('Name');
  const _desc = $("<td>").addClass("row").text('Description');
  const _price = $("<td>").addClass("row").text('Price');
  const _quantity = $("<td>").addClass("row").text('Quantity');

  th.append(_id).append(_name).append(_desc).append(_price).append(_quantity);
  table.append(th);
  for (let item in items){
  const tr = $("<tr>").addClass("row");
    const id = $("<td>").addClass("idPK").text(items[item].id);
    const name = $("<td>").addClass("iName").text(items[item].name);
    const description = $("<td>").addClass("desc").text(items[item].description);
    const price = $("<td>").addClass("price").text(items[item].item_price);
    const quantity = $("<td>").addClass("quant").text(items[item].quantity);
    tr.append(id).append(name).append(description).append(price).append(quantity);
  table.append(tr);
  }
  const inventory = $('#inventory').append(table);

  return inventory;
}

