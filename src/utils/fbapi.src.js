
var FBAPI = window.FBAPI || {}

var login = require('facebook-chat-api');
var onlineUsers = [];

function do_login(username, pass, success_callback){
	var userpassobject = {};
	userpassobject['email'] = username;
	userpassobject['password'] = password;
	//console.log(username,password);
	login({email: username, password: password}, 
		function callback(err, api){
			if(err) {
				success_callback(false);
				return console.error(err);
			}
			console.log("Successful login.");
			success_callback(true);

			api.listen(function callback(err, message) {
        		console.log(err, message);
    		});
		})
}

function getOnlineUsers(username, password){
	login({email: username, password: password},
		function callback(err, api){
			if(err) return console.error(err);

		});
}

FBAPI.do_login = do_login;
FBAPI.onlineUsers = onlineUsers;

window.FBAPI = FBAPI