
var login = require('facebook-chat-api');
var onlineUsers = [];

function do_login(username, password, success_callback){
	var uname = username;
	var pass = password;

	var userpassobject = {};
	userpassobject['email'] = username;
	userpassobject['password'] = password;
	//console.log(username,password);
	login(userpassobject, 
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

module.exports.login = do_login
