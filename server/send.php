<?php
$dbconn = pg_connect("host=localhost dbname=postgres user=postgres password=hackharvard")
    or die('Could not connect: ' . pg_last_error());
if($_SERVER['REQUEST_METHOD'] == 'POST'){
	$sender = $_POST['name'];
	$type = $_POST['type'];
	if($type == "text"){
		$to_insert = $_POST['text'];
		echo("Sent text: ".$to_insert);
		$result = pg_prepare($dbconn, "addmsg", "INSERT INTO message (sender, sent, iora, data) VALUES ($1, 'now', false, $2)");
	} else if($type == "img"){
		// base64
		//$to_insert = ;
		$result = pg_prepare($dbconn, "addmsg", "INSERT INTO message (sender, sent, iora, data) VALUES ($1, 'now', true, $2)");
	} else {
		echo("Invalid request");
		die();
	}

	$args = array($sender, to_insert);

	$result = pg_execute($dbconn, "addmsg", $args);

	echo($result);

} else {
	echo("Invalid GET request");
	die();
}