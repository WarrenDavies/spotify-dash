<?php 
require('env.php'); ?>
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>New Site</title>
  <meta name="description" content="Spotify-dash">
  <script type="text/javascript" src="jquery-3.4.1.js"></script>
  <!-- <script src="js.js"></script> -->
  <script type="text/javascript" src="main.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body onload="checkAuth()">
<h1>Home</h1>

<a href="https://accounts.spotify.com/authorize?client_id=<?php echo $client_id ?>&redirect_uri=<?php echo $redirect_uri ?>&scope=user-read-private%20user-read-email%20user-top-read%20user-read-currently-playing%20user-read-playback-state&response_type=token&state=34fFs29kd09">Log in to Spotify</a>

<div class="container">
  <div class="holder">
    <h3>User:</h3>
    <div id="user_response" class="scroll-y"></div>
  </div>
  <div class="holder">
    <h3>Top Artists</h3>
    <pre id="artists_response" class="scroll-y"></pre>
  </div>
  <div class="holder">
    <h3>Top Tracks:</h3>
    <pre id="tracks_response" class="scroll-y"></pre>
  </div>
</div>
<div class="container">
  <div class="holder">
    <h3>Top Genres:</h3>
    <div id="genre_response" class="scroll-y"></div>
  </div>
  <div class="holder">
    <h3>Popularity of your top 50:</h3>
    <h4>Most Popular:</h4>
    <div id="top-popularity_response"></div>
    <h4>Least Popular:</h4>
    <div id="bottom-popularity_response"></div>
    <h4>Average Popularity:</h4>
    <div id="average-popularity_response"></div>
  </div>

  <div class="holder">
    <h3>Duration of your top 50 tracks:</h3>
    <h4>Longest:</h4>
    <div id="longest-track_response"></div>
    <h4>Shortest:</h4>
    <div id="shortest-track_response"></div>
    <h4>Average:</h4>
    <div id="average-track_response"></div>
    <h4>Total:</h4>
    <div id="total-track_response"></div>
  </div>
</div>
<div class="container">
  <div class="holder">
    <h3>Now playing:</h3>
    <div id="now-playing"></div>
  </div>
</div>
<!-- <script src="main.js"></script> -->
</body>
</html>
