var user1 = "Takashi";
var user2 = "Calvin";

//If user submits the form
function sendMsg(){
    var clientmsg = $("#inputForm").val();
    $.post("http://192.241.249.103/send.php", {text: clientmsg, name: user1, type: "text"});              
    $("#inputForm").attr("value", "");
    getChatLog();
    return false;
}

function getChatLog(){
	$.get("http://192.241.249.103/index.php", function(data){
		var parsedData = JSON.parse(data);
		$("#msgContainer").empty();
		for(var i = 0; i < parsedData.length; i++){
			var currentObj = parsedData[i];
			if(currentObj['iora'] == 'f'){
				var outputData = currentObj['data'];
			} else {
				// we have an image on our hands
				//var outputData = "<img src=data:image/jpg;base64," + currentObj['data'] + "\">";
				var outputData = '<img src="data:image/jpg;base64,' + currentObj['data'] + '" class="decodedMessages" alt="hey" style="width: 100px; height: 150px; margin-top: 0px;">';

			}
			console.log("sender",currentObj['sender']);
			console.log(outputData);
			if(currentObj['sender'] == user1){
				// generate user1 stuff
				$.ajax({
					url: "templates/message_item_ours.html",
					success: function(response){
						// set attributes
						var replaced = response.replace("[BODY]", outputData);
						$("#msgContainer").append(replaced);
					},
					async: false
				});
			} else {
				// generate user2 stuff
				$.ajax({
					url: "templates/message_item_theirs.html",
					success: function(response){
						// set attributes
						var replaced = response.replace("[BODY]", outputData);
						$("#msgContainer").append(replaced);
					},
					async: false
				});
			}

		}
		//Auto-scroll	
		var objDiv = document.getElementById("msgContainer");		
		objDiv.scrollTop = objDiv.scrollHeight;
	});
}

$(function(){
	$("#send_button").click(function(event){
		event.preventDefault();
		console.log("Send button clicked");
		sendMsg();
	});
	getChatLog();
	setInterval (getChatLog, 10000);
});