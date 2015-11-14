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

	return true;
}

function setError(str){
	// using alert because lazy
	alert(str);
}

function doLogin(){
	if(!(username && password)){
		setError("You need to enter both a username and password.");
		return console.log("Username or Password not set.");
	}

	FBAPI.do_login(username, password, function(success){
		if(success)
			loadMessageThreads();
		else{
			disableSpinner();
			setError("Login failed. Please check your username and password.");
		}
	});

	enableSpinner();
}

function enableSpinner(){
	$("#loginform").hide("fast", function(){
		console.log("form hidden");
	});

	$("#loading").show("fast", function(){
		console.log("spinner shown");
	});
}

function disableSpinner(){
	$("#loading").hide("fast", function(){
		console.log("spinner hidden");
	});

	$("#loginform").show("fast", function(){
		console.log("form shown");
	});
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
		event.preventDefault();
		username = $("#username").val();
		password = $("#password").val();
		doLogin();
	});
});