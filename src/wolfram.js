/* 
JavaScript EmbedCode usage:

var wcc = new WolframCloudCall();
wcc.insertMessage(image, message, function(result) { console.log(result); });
*/
 
var WolframCloudCall;

(function() {
WolframCloudCall = function() {	this.init(); };

var p = WolframCloudCall.prototype;

p.init = function() {};

p._createCORSRequest = function(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
};

p._encodeArgs = function(args) {
	var argName;
	var params = "";
	for (argName in args) {
		params += (params == "" ? "" : "&");
		params += encodeURIComponent(argName) + "=" + encodeURIComponent(args[argName]);
	}
	return params;
};

p._auxCall = function(url, args, callback) {
	var params = this._encodeArgs(args);
	var xhr = this._createCORSRequest("post", url);
	if (xhr) {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("EmbedCode-User-Agent", "EmbedCode-JavaScript/1.0");
		xhr.onload = function() {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				callback(xhr.responseText);
			} else {
				callback(null);
			}
		};
		xhr.send(params);
	} else {
		throw new Error("Could not create request object.");
	}
};

//formerly called p.call
p.insertMessage = function(image, message, callback) {
	var url = "http://www.wolframcloud.com/objects/user-b156354d-c537-4c00-91ef-31bb69876c20/insertion";
	var args = {image: image, message: message};
	var callbackWrapper = function(result) {
		if (result === null) callback(null);
		else callback(result);
	};
	this._auxCall(url, args, callbackWrapper);
};

p.extractImage = function(image, callback) {
	var url = "http://www.wolframcloud.com/objects/user-b156354d-c537-4c00-91ef-31bb69876c20/extraction";
	var args = {image: image};
	var callbackWrapper = function(result) {
		if (result === null) callback(null);
		else callback(result);
	};
	this._auxCall(url, args, callbackWrapper);
};

})();
