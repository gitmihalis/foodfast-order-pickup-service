function load() {
  $.ajax({
      url: '/testtwo',
      type: 'GET'
  }).then(function (jsonContent) {
      display(jsonContent);
  });
}

function display(object){
  $("#empty").text(object[0].description);
  console.log(object);
  console.log(object[0]);
}
