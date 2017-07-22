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
  $("#empty").text(object[0].description);
  console.log(object);
  console.log(object[0]);
}



