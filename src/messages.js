var user1 = "Takashi";
var user2 = "Calvin";

//If user submits the form
function sendMsg(){
  $("#send_button").click(function(){   
    var clientmsg = $("#inputForm").val();
    $.post("post.php", {text: clientmsg});              
    $("#inputForm").attr("value", "");
    getChatLog();
    return false;
  });
}

function getChatLog(){
	$.get("http://192.241.249.103/index.php", function(data){
		var parsedData = json.parse(data);
		$("#msgContainer").empty();
		for(var i = 0; i < parsedData.length; i++){
			var outputData = "";
			if(parsedData['iora'] == 'f'){
				outputData = parsedData['data'];
			} else {
				// we have an image on our hands
				outputData = "<img src=data:image/jpg;base64," + parsedData['data'] + "\">";
			}
			if(parsedData['sender'] == user1){
				// generate user1 stuff
				$.get("templates/message_item_ours.html", function(response){
					// set attributes
					var replaced = response.replace("[BODY]", outputData);
					$("#msgContainer").append(replaced);
				});
			} else {
				// generate user2 stuff
				$.get("templates/message_item_theirs.html", function(response){
					// set attributes
					var replaced = response.replace("[BODY]", outputData);
					$("#msgContainer").append(replaced);
				});
			}

		}
	});
}

$(function(){
	setInterval (loadLog, 2000);
});