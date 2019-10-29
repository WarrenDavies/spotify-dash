function checkAuth() {
    if (window.location.hash.substr(1) != "") {
        let type = window.location.hash.substr(1);
        var token = type.substring(13, type.search("token_type") - 1);
        $.get("https://api.spotify.com/v1/me?access_token=" + token, function(data){
            console.log(data);
            $("#response").html(JSON.stringify(data));
        });
    } else {

    }
}