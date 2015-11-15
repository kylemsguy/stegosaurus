<?php
session_start();
$dbconn = pg_connect("host=localhost dbname=postgres user=webappuser password=foo")
    or die('Could not connect: ' . pg_last_error());
if($_SERVER['REQUEST_METHOD'] == "GET"){
		//INSERT INTO message VALUES ('takashi', 'now', 
		//$stmt = $dbconn.query("SELECT * FROM message;");
		$result = pg_query($dbconn, "SELECT * FROM message");

		$resultset = array();

		while ($row = pg_fetch_array($result)) {
			$tmprow = array();
			$tmprow['id'] = row['id'];
			$tmprow['sender'] = row['sender'];
			$tmprow['sent'] = row['sent'];
			$tmprow['iora'] = row['iora'];
			$tmprow['data'] = row['data'];
			$resultset[] = $tmprow;
      //print_r($row);
    }

    $to_return = json_encode($resultset);
    echo($to_return);

}