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
		loadMessages();
		return true;
	});
}

function loadMessages(){
	return false;
}

function loadMessagesPage(){
	$("#body").empty();
	$("#body").html("MESSAGES GO HERE!");
}

$(function(){
	loadCredentials();
	$("#loginform").submit(function(event){
		username = $("#username").val();
		password = $("#password").val();
		loadMessages();
		event.preventDefault();
	});
});