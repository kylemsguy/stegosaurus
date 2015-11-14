var FBAPI = window.FBAPI || {}

var login = require('facebook-chat-api');

function testlolol(){
	console.log(login);
	// Create simple echo bot
	login({email: "USERNAME", password: "PASSWORD"}, function callback (err, api) {
	    if(err) return console.error(err);

	    api.listen(function callback(err, message) {
	        //api.sendMessage(message.body, message.threadID);
	        console.log(message);
	    });
	});
}

function login(username, password){
	login({email: username, password: password}, 
		function callback(err, api){
			if(err) return console.error(err);
			console.log("Successful login.");

		})
}

FBAPI.login = login;
FBAPI.testlolol = testlolol;

window.FBAPI = FBAPI