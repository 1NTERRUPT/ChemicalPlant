function qualifyUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  var full = a.href;
  return full.substring(7);
}

$(function () {
  $('.loggedin').hide();
  var url = qualifyUrl(('/'));
  var ws = new WebSocket('ws://'.concat(url));

  $('#btnMakeMix').click(function (evt) { 
    var total = 1000;

    var red = parseInt($('#red').val());
    var green = parseInt($('#green').val());
    var blue = parseInt($('#blue').val());

    alert('Beginning processing');

    ws.send('RT'); 
    setTimeout(function() {
      ws.send('RF'); 
      ws.send('BT'); 
      setTimeout(function() {
        ws.send('BF'); 
        ws.send('GT'); 
        setTimeout(function() {
          ws.send('GF'); 
        }, green*total);
      }, blue*total);
    }, red*total);


    return false;
   });


   $('#adminLogin').click(function() {
     if($('#username').val() === 'hdavis' && $('#password').val() === 'ztbwF5xx') {
       $('.loggedout').hide();
       $('.loggedin').show();
     } else {
       alert('Access is denied');
     }
     return false;
   });
});
