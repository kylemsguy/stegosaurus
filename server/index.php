<?php
$dbconn = pg_connect("host=localhost dbname=postgres user=postgres password=hackharvard")
    or die('Could not connect: ' . pg_last_error());
if($_SERVER['REQUEST_METHOD'] == "GET"){
		//INSERT INTO message VALUES ('takashi', 'now', 
		//$stmt = $dbconn.query("SELECT * FROM message;");
		$result = pg_query($dbconn, "SELECT * FROM message");

		$resultset = array();

		while ($row = pg_fetch_array($result)) {
			$resultset[] = $row;
      //print_r($row);
    }

    $to_return = json_encode($resultset);
    echo($to_return);

}