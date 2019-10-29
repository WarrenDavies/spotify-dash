function checkAuth() {
    if (window.location.hash.substr(1) != "") {
        let type = window.location.hash.substr(1);
        var token = type.substring(13, type.search("token_type") - 1);
        $.ajax({
            url: 'https://api.spotify.com/v1/me?access_token=' + token,
            complete: function(data) {
                $("#user_response").html(JSON.stringify(data));
            }
        });
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
            headers:{'Authorization':'Bearer ' + token},
            complete: function(data) {
                console.log(data);
                dataString = JSON.stringify(data);
                dataBreaks = dataString.replace(/\\n/g, "<br/>");
                dataBreaks = dataBreaks.replace(/\\/g, " ");
                let artists = "";
                console.log(data.responseJSON.items);
                data.responseJSON.items.forEach(function(i, j) {
                    if (i.name) {
                        artists += i.name + "<br/>"
                    }
                });
                $("#artists_response").html(artists);
            }
        });
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
            headers:{'Authorization':'Bearer ' + token},
            complete: function(data) {
                console.log(data);
                dataString = JSON.stringify(data);
                dataBreaks = dataString.replace(/\\n/g, "<br/>");
                dataBreaks = dataBreaks.replace(/\\/g, " ");
                let tracks = "";
                console.log(data.responseJSON.items);
                data.responseJSON.items.forEach(function(i, j) {
                    if (i.name) {
                        tracks += i.name + "<br/>"
                    }
                });
                $("#tracks_response").html(tracks);
            }
        });
    } else {

    }
}