//Create a menu block with items from database
function createMenu(data){
  let name = data.name;
  let photo = data.picture_file;
  let price = data.item_price;
  let description = data.description;

  let menuPhoto = $("<img>").addClass("menuPhoto").attr('src', photo);
  let menuName = $("<span>").addClass("menuName").text(name);
  let menuButton = $("<span>").addClass("addButton");
  let menuPrice = $("<p>").addClass("menuPrice").text('$' + price);
  let menuDescription = $("<p>").addClass("menuDescription").text(description);
  let menu = $("<div>").addClass("menuItem").append(menuPhoto, menuName, menuButton, menuPrice, menuDescription);

  return menu;
}

//Render all of the menu blocks to display on the page
function renderMenu(items) {
  for (let item in items){
    let $menu = createMenu(items[item]);
    $('#main').append($menu);
  }
}

//Load the menu items from database
function load() {
  $.ajax({
      url: '/load',
      type: 'GET'
  }).then(function (jsonContent) {
      renderMenu(jsonContent);
  });
}

//Load the orders from database
function loadOrders() {
  $.ajax({
      url: '/loadOrders',
      type: 'GET'
  }).then(function (jsonContent) {
      renderOrder(jsonContent);
  });
}

//Create an order block with the data from database
function createOrder(data){
  //Order variables from data
  let name = "Order for " + data.name + " ";
  let phone = data.phone_number;
  let date = data.order_date;
  let prep = data.estimated_time;
  let id = data.id;

  //Variables for the counter
  let prepMilli = Number(prep) * 60 * 1000;
  let countDownDate = new Date(date).getTime() + prepMilli;
  let now = new Date().getTime();
  let distance = countDownDate - now;

  //Order variables into HTML
  let orderPhone = $("<span>").addClass("orderPhone").text("(" + phone + ")");
  let orderFor = $("<h1>").addClass("orderName").text(name).append(orderPhone);
  let orderId = $("<span>").addClass("orderId").text(id);
  let orderDate = $("<p>").addClass("orderDate").text("Date: " + date.slice(0, 10) + ", Order ID: ").append(orderId);
  let orderList = $("<span>").attr("id", "orderList");
  let orderTimer = $("<span>").addClass("orderTimer").attr("id", "timer" + id).text("");
  let ordercomplete = $ ("<button>").addClass("complete").text("complete");
  let order = $("<div>").attr("id", "allOrders").addClass("allOrders").append(orderFor, orderDate, orderTimer, orderList, ordercomplete);

  let timerIdName = "#timer" + id;
    //Timer function
    let x = setInterval(function() { // Update the count down every 1 second
      let now = new Date().getTime();
      let distance = countDownDate - now;

      // Time calculations for minutes and seconds
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      //Pad the displayed number with zeros
      function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
      }
        // Display the result in the element with class="orderTime"
      let timer = minutes + ":" + pad(seconds) + "min";
      $(timerIdName).text(timer);
      // If the count down is finished, order is overdue
      if (distance < 0) {
        clearInterval(x);
        $(timerIdName).text('OVERDUE');
      }
    }, 1000);
  return order
}

//Load the items from the database
function loadItems(id) {
  $.ajax({
      url: '/loadItems',
      type: 'GET',
      data: {'id': id}
  }).then(function (jsonContent) {
      renderOrderItems(jsonContent);
  });
}

//Render the items to display in the orders
function renderOrderItems(data){
  let itemsArray = [];
  let quantitiesArray = [];
  for (let val in data){
    itemsArray.push(data[val].name);
    quantitiesArray.push(data[val].quantity);
  }
  //Make items an HTML jot list
  let items = '';
  for (let item in itemsArray){
    items += `<li>${itemsArray[item]} (${quantitiesArray[item]})</li>`;
  }
  //Add the items to the corresponding HTML block
  let orderList = $("<ul>").addClass("orderList").html(items);
  let itemId = "#" + data[0].id;
  $(itemId).append(orderList);
}

//Render all of the orders to display in the blocks
function renderOrder(items) {
  for (let item in items){
    let $order = createOrder(items[item]);
    $("#listOrders").prepend($order);
    $("#orderList").attr("id",(items[item].id));
    loadItems(items[item].id);
  }
}

