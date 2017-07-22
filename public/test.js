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
  //$('#fullMenu').prepend(menu);
}

function renderMenu(items) {
  for (let item in items){
    let $menu = createMenu(items[item]);
    $('#main').append($menu);
  }
}

function load() {
  $.ajax({
      url: '/testtwo',
      type: 'GET'
  }).then(function (jsonContent) {
      renderMenu(jsonContent);
  });
}

function display(object){
  console.log(object);
}


function loadOrders() {
  $.ajax({
      url: '/testthree',
      type: 'GET'
  }).then(function (jsonContent) {
      renderOrder(jsonContent);
      console.log(jsonContent);
  });
}

function createOrder(data){

  let name = "Order for " + data.name + " ";
  let phone = data.phone_number;
  let date = data.order_date;
  let itemsArray = ['Burger', 'Salad', 'Cake'];
  let quantityArray = [1, 2, 1];
  let prep = data.estimated_time;

  let items = '';
  for (let item in itemsArray){
    items += `<li>${itemsArray[item]} (${quantityArray[item]})</li>`;
  }

  let orderPhone = $("<span>").addClass("orderPhone").text("(" + phone + ")");
  let orderFor = $("<h1>").addClass("orderName").text(name).append(orderPhone);
  let orderDate = $("<p>").addClass("orderDate").text(date);
  let orderList = $("<ul>").addClass("orderList").html(items);
  let orderTimer = $("<span>").addClass("orderTimer").text("");
  let orderConfirm = $("<input>").attr("type", "submit").attr("value", "Complete").addClass("complete")
  let orderConfirmInput = $("<input>").attr("type", "hidden").attr("value", "complete").attr("name", "status");
  let form = $("<form>").append(orderConfirmInput, orderConfirm);
  let order = $("<div>").attr('id', "allOrders").append(orderFor, orderDate, orderTimer, orderList, form);

    let prepMilli = prep * 60 * 1000;
    let countDownDate = new Date(date).getTime() + prepMilli;
      let now = new Date().getTime();
      let distance = countDownDate - now;

    if (distance < 0) {
      $(".orderTimer").text('OVERDUE');
      //clearInterval(x);
    } else {
      let x = setInterval(function(distance) { // Update the count down every 1 second
        // Time calculations for minutes and seconds
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //Pad the displayed number with zeros
        function pad(d) {
          return (d < 10) ? '0' + d.toString() : d.toString();
        }
        let timer = minutes + ":" + pad(seconds) + "min";
        $(".orderTimer").text(timer);
      }, 1000);
    }
  return order
}

function renderOrder(items) {
  for (let item in items){
    let $order = createOrder(items[item]);
    $("#listOrders").prepend($order);
  }
}

