<?php 
require('env.php'); ?>

<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>New Site</title>
  <meta name="description" content="Spotify-dash">
  <script src="jquery-3.4.1.js"></script>
  <link rel="stylesheet" href="style.css?v=1.0">
</head>
<body>
<h1>Home</h1>

<br/><br/>
<br/><br/>
<br/><br/>
<a href="https://accounts.spotify.com/authorize?client_id=<?php echo $client_id ?>&redirect_uri=<?php echo $redirect_uri ?>&scope=user-read-private%20user-read-email&response_type=token&state=34fFs29kd09">Get token session (implicit step 1)</a>
<br/><br/>
<div id="button3">Get profile (implicit step 2)</div>

<br/><br/>
Data: 
<div id="response">

</div>





<script src="main.js"></script>
</body>
</html>
