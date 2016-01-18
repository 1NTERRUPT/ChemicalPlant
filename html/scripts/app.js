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

  $('#btnRed').click(function (evt) { 
    ws.send(JSON.stringify({red: 5})); 
  });
});
