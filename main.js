$("#button3").click(function(){
    let type = window.location.hash.substr(1);
    var token = type.substring(13, type.search("token_type") - 1);
    console.log(type);
    console.log(token);
    $.get("https://api.spotify.com/v1/me?access_token=" + token, function(data){
      console.log(data);
      $("#response").html(JSON.stringify(data));
    });

  });