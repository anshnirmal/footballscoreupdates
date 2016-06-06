var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var scores = require('scores-parser');  

app.set('port', (process.env.PORT || 8081))

app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
});

app.get('/getproducts', function (req, resp){
  scores({ date: '2016-06-05' }, function (data) {
    console.log(data);
  })
});

var server = app.listen(app.get('port'), function () {
  var port = server.address().port
  console.log("Example app listening at %s Port", port)
})


