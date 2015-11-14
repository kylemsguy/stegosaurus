var loggedIn = false;
var username = undefined;
var password = undefined;

function loadCredentials(){
	chrome.storage.local.get(["username", "password"], function(items){
		if(!(username && password)){
			console.log("Failed to get username and password.");
			return false;
		}
		username = items.username;
		password = items.password;
		loadMessageThreads();
		return true;
	});
}

function loadMessageThreads(){
	if(!(username && password))
		return false;
	Stegosaurus.login(username, password);
	return true;
}

function clearHeader(){
	$("#header").empty();
}

function clearBody(){
	$("#body").empty();
}

function clearFooter(){
	$("#footer").empty();
}

$(function(){
	loadCredentials();
	$("#loginform").submit(function(event){
		username = $("#username").val();
		password = $("#password").val();
		loadMessageThreads();
		event.preventDefault();
	});
});