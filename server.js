var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var caniuse = require('caniuse-api');
var app = express();
var scores = require('scores-parser');  
var token = "EAAXPLuYkUpEBAEJq4kG9LhlnGFY6RLmjXeR1Ia6F2qTCigMl4CwgoEeNra3s1aWAYK9A7qZBYE5NYUTbZBZCnv2WGYeHO8ASMgGQs4A1lnF3hKzflVy2Q80RV4gIdWhPukDsfhLJhZCapMDX3hoGe9ilfoA0oZB4Yhjodve5oe8cMS1EPIdZAk";

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

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

// to post data
app.post('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i]
		sender = event.sender.id
		if (event.message && event.message.text) {
			prop = event.message.text
			console.log("#################", prop);
			console.log("#################", sender);
      // GetMovieName(sender,text)
      IsValidProperty(sender,prop);
		}
	}
	res.sendStatus(200)
})

function IsValidProperty(sender, prop){
  SendInfoToUser(prop, sender);
}

function SendInfoToUser(prop, sender){
	  scores({ date: '2016-06-04' }, function (data) {
    var result_text = "-- : Match Results : -- \n\n";
    
    for (i = 0 ; i < 2 ; i++) {
            result_text += 'Status: ' + data[i].status + '\n';
            result_text += 'Home: ' + data[i].home + '\n';
            result_text += 'Away: ' + data[i].away + '\n';
            result_text += 'Result: ' + data[i].result + '\n\n\n';
          }
  })
		console.log(result_text);
  	var moreInfo = caniuse.find('border');
  var moreinfoString = moreInfo.join(",");
    PostToUser(sender, moreinfoString);
}

function PostToUser(senderId, message){
	messageData = {
		text:message
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:senderId},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

app.get('/getproducts', function (req, resp){
  scores({ date: '2016-06-05' }, function (data) {
    console.log(data);
  })
});

var server = app.listen(app.get('port'), function () {
  var port = server.address().port
  console.log("Example app listening at %s Port", port)
})


