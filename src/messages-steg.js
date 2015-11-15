var user1 = "Takashi";
var user2 = "Calvin";

var decodeQueue = []

var image_urls = ["http://img11.deviantart.net/9dd3/i/2013/081/d/9/stego_dino_paper_by_apofiss-d54ehuu.jpg",
					"http://img11.deviantart.net/9dd3/i/2013/081/d/9/stego_dino_paper_by_apofiss-d54ehuu.jpg"];

//If user submits the form
function sendMsg(){
    var clientmsg = $("#inputForm").val();
    var wcc = new WolframCloudCall();

    $.get(getRandomImage(), function(image){
    	wcc.insertMessage(image, clientmsg, 
		function(result) { 
			$.post("http://192.241.249.103/send.php", {text: result, name: user1, type: "img"});              
		    $("#inputForm").attr("value", "");
		    getChatLog();
		});
    });
    return false;
}

function getRandomImage(){
	var index = Math.floor(Math.random() * 50);

	if(index > 50){
		index = 1;
	} else {
		index = 0;
	}

	return image_urls[index];

}

function getChatLog(){
	$.get("http://192.241.249.103/index.php", function(data){
		decodeQueue = []; // potential race condition
		var parsedData = JSON.parse(data);
		$("#msgContainer").empty();
		for(var i = 0; i < parsedData.length; i++){
			var currentObj = parsedData[i];
			if(currentObj['iora'] == 'f'){
				var outputData = currentObj['data'];
			} else {
				// we have an image on our hands
				//var decodeData = atob(currentObj['data']);
				decodeQueue.push(currentObj['data']);
				var outputData = '<a href="#" class="clickable" id="' + i + '"><img src="data:image/jpg;base64,' + currentObj['data'] + '" class="decodedMessages" alt="hey" style="width: 100px; height: 150px; margin-top: 0px;"></a>';
			}
			//console.log("sender",currentObj['sender']);
			//console.log(outputData);
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
	});
}

function handleClick(caller){
	var id = caller.attr("id");
	var rawData = decodeQueue[int(id)];
	var unb64 = atob(rawData);

	var wcc = new WolframCloudCall();
	wcc.extractImage(unb64, function(result) {
		alert(result);
	});
}

$(function(){
	$("#send_button").click(function(event){
		event.preventDefault();
		console.log("Send button clicked");
		sendMsg();
	});
	$(".clickable").click(function(event){
		handleClick(this);
	});
	getChatLog();
	setInterval (getChatLog, 10000);
});