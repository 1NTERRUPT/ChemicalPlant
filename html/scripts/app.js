function qualifyUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  var full = a.href;
  return full.substring(7);
}

$(function () {
  var url = qualifyUrl(('/'));
  var ws = new WebSocket('ws://'.concat(url));

  ws.onmessage = function (event) {
    console.log(JSON.parse(event.data));
  }

  $('#red,#green,#blue').focusout(function(evt) {
    var red = parseInt($('#red').val());
    var green = parseInt($('#green').val());
    var blue = parseInt($('#blue').val());

    if(red + blue + green > 100) {
      $('#btnMakeMix').prop("disabled",true);
      alert('Percentages must total less than 100');
    } else {
      $('#btnMakeMix').prop("disabled",false);
    }
    
  });

  $('#btnMakeMix').click(function (evt) { 
    var total = 10000;

    var red = parseInt($('#red').val());
    var green = parseInt($('#green').val());
    var blue = parseInt($('#blue').val());

    ws.send('RT'); 
    setTimeout(function() {
      ws.send('RF'); 
    }, red*total/100);
    
    ws.send('BT'); 
    setTimeout(function() {
      ws.send('BF'); 
    }, blue*total/100);

    ws.send('GT'); 
    setTimeout(function() {
      ws.send('GF'); 
    }, green*total/100);
   });
});
