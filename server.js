var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var scores = require('scores-parser');  

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
});

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'this_is_my_bot_and_my_name_is_my_pwd') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
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


