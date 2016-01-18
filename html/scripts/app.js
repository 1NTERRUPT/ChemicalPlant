function qualifyUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  var full = a.href;
  return full.substring(7);
}

$(function () {
  var url = qualifyUrl(('/'));
  var ws = new WebSocket('ws://'.concat(url));

  $('#btnMakeMix').click(function (evt) { 
    var total = 1000;

    var red = parseInt($('#red').val());
    var green = parseInt($('#green').val());
    var blue = parseInt($('#blue').val());

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
   });


   $('#adminLogin').click(function() {
     if($('#username').val() === 'hdavis' && $('#password').val() === 'ztbwF5xx') {
       $('#readonly').css('display','none');
       $('#admin').css('display','');
     } else {
       alert('Access is denied');
     }
   });
});
