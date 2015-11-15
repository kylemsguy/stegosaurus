var cb = new Codebird;
cb.setConsumerKey("8noH57m9eXeahi0vxaV3eaF0u", "M63fj8VE1Dt4K5P1OgZcANkXgPpMfO2glo8VhKEff0f3qSL0cv");

function loadCredentials(){
	chrome.storage.local.get(["oauth_token", "oauth_token_secret"], function(items){
		if(!(items.oauth_token && items.oauth_token_secret)){
			return false;
		}
		cb.setToken(items.oauth_token, items.oauth_token_secret);
		loadMessageThreads();
		return true;
	});
}

function loadMessageThreads(){
	console.log("You win!");
	return true;
}

function setError(str){
	// using alert because lazy
	alert(str);
}

function doLogin(event){
	//chrome.tabs.create({"url": "background.html"});
	event.preventDefault();
	// gets a request token
	cb.__call(
	    "oauth_requestToken",
	    {oauth_callback: "oob"},
	    function (reply,rate,err) {
	        if (err) {
	            console.log("error response or timeout exceeded" + err.error);
	        }
	        if (reply) {
	            // stores it
	            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

	            // gets the authorize screen URL
	            cb.__call(
	                "oauth_authorize",
	                {},
	                function (auth_url) {
	                    window.codebird_auth = window.open(auth_url);
	                }
	            );
	        }
	    }
	);
}

function handlePin(){
	event.preventDefault();
	var pin = $("#pin").val();
	console.log(pin);
	cb.__call(
	    "oauth_accessToken",
	    {oauth_verifier: pin},
	    function (reply,rate,err) {
	        if (err) {
	            console.log("error response or timeout exceeded" + err.error);
	        }
	        console.log(reply.oauth_token);
	        if (reply) {
	            // store the authenticated token, which may be different from the request token (!)
	            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

	            chrome.storage.local.set({'oauth_token': reply.auth_token,
	        							  'oauth_token_secret': reply.oauth_token_secret});
	        }

	        // if you need to persist the login after page reload,
	        // consider storing the token in a cookie or HTML5 local storage
	    }
	);

	console.log()
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

function clearMessages(){
	$("#message_container").empty();
}

$(function(){
	if(loadCredentials())
		return;

	$("#twitter_login").click(doLogin);
	
	$("#pinentry").submit(function(event){
		event.preventDefault();
		handlePin();
	});
});