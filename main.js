function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function checkAuth() {
    afterTimestamp = new Date(); 
    afterTimestamp.setMonth(afterTimestamp.getYear()-1);

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
            url: 'https://api.spotify.com/v1/me/player',
            headers:{'Authorization':'Bearer ' + token},
            complete: function(data) {
                console.log("player");
                console.log(data);
                $("#now-playing").html(JSON.stringify(data));
            }
        });
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player/recently-played',
            qs: {
                // after : afterTimestamp,
                limit : 500
            },
            headers:{'Authorization':'Bearer ' + token},
            
            complete: function(data) {
                console.log("recently played");
                console.log(data);
                dataString = JSON.stringify(data);
                dataBreaks = dataString.replace(/\\n/g, "<br/>");
                dataBreaks = dataBreaks.replace(/\\/g, " ");

                historyString = "";

                data.responseJSON.items.forEach(function(i, j) {
                    historyString = historyString + i.played_at + ": "
                    i.track.artists.forEach(function(k, l) {
                        historyString = historyString + k.name + ", "
                    });

                    historyString = historyString + i.track.name + ', ';

                    historyString = historyString + i.track.duration_ms + ', ';

                    historyString = historyString + '<br/>';
                
                
                });

                $("#recently-played").html(historyString);
            }
        });
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
            headers:{'Authorization':'Bearer ' + token},
            complete: function(data) {
                
                // console.log(data);
                dataString = JSON.stringify(data);
                dataBreaks = dataString.replace(/\\n/g, "<br/>");
                dataBreaks = dataBreaks.replace(/\\/g, " ");
                let artists = "";
                let artistsData = [];
                let artistGenres = [];
                let artistPopularity = [];
                let averagePopularity = 0;
                let artistGenreCount = [];
                console.log("artists");
                console.log(data.responseJSON.items);
                data.responseJSON.items.forEach(function(i, j) {
                    if (i.name) {
                        artists += i.name + "<br/>"
                        artistsData.push({
                            name: i.name,
                            popularity: i.popularity,
                        })
                    }
                    if (i.genres) {
                        i.genres.forEach(function(k, l){
                            if (artistGenres.length == 0) {
                                artistGenres.push({
                                    name: k,
                                    count: 1
                                });
                            } else {
                                let found = false;
                                for(var m = 0; m < artistGenres.length; m++) {
                                    if (artistGenres[m].name == k) {
                                        artistGenres[m].count += 1
                                        found = true;
                                        break;
                                    }
                                }
                                if (found == false) {
                                    artistGenres.push({
                                        name: k,
                                        count: 1
                                    });
                                }
                            }
                        });
                    }
                    if (i.popularity) {
                        artistPopularity.push(i.popularity);
                    }
                });
                artistGenres.sort((a, b) => {
                    let order1 = b.count - a.count;
                    if (order1 !== 0) {
                        return order1;
                    } 
                    return a.name - b.name
                });
                artistsData.sort((a, b) => {
                    let order1 = b.popularity - a.popularity;
                    if (order1 !== 0) {
                        return order1;
                    } 
                    return a.name - b.name
                });
                console.log("artistGenres:");
                console.log(artistGenres);
                let genreList = "";
                artistGenres.forEach(function(i, j) {
                    genreList += i.name + " (" + i.count + ") <br/>";
                })
                artistPopularity.forEach(function(i, j) {
                    averagePopularity += i;
                })
                averagePopularity = averagePopularity / artistPopularity.length;
                
                let topPopularity = artistsData[0].popularity + " (" + artistsData[0].name + ")";
                
                let bottomPopularity = artistsData[artistsData.length - 1].popularity + " (" + artistsData[artistsData.length - 1].name + ")";


                $("#artists_response").html(artists);
                $("#genre_response").html(genreList);

                $("#top-popularity_response").html(topPopularity);
                $("#bottom-popularity_response").html(bottomPopularity);
                $("#average-popularity_response").html(averagePopularity);
                
            }
        });
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
            headers:{'Authorization':'Bearer ' + token},
            complete: function(data) {
                console.log("tracks:");
                console.log(data);
                dataString = JSON.stringify(data);
                dataBreaks = dataString.replace(/\\n/g, "<br/>");
                dataBreaks = dataBreaks.replace(/\\/g, " ");
                let tracks = "";
                let tracksData = [];
                let averageDuration = 0;
                let totalDuration = 0;
                console.log(data.responseJSON.items);
                data.responseJSON.items.forEach(function(i, j) {
                    if (i.name) {
                        tracks += i.name + "<br/>"
                    }
                    tracksData.push({
                        name: i.name,
                        popularity: i.popularity,
                        duration: i.duration_ms
                    })
                    totalDuration += i.duration_ms;
                });
                $("#tracks_response").html(tracks);
                
                tracksData.sort((a, b) => {
                    let order1 = b.duration - a.duration;
                    if (order1 !== 0) {
                        return order1;
                    } 
                    return a.name - b.name
                });
                totalDurationTime = millisToMinutesAndSeconds(totalDuration);

                averageDuration = millisToMinutesAndSeconds(totalDuration / tracksData.length);
                let topTrackDuration = millisToMinutesAndSeconds(tracksData[0].duration) + " (" + tracksData[0].name + ")";
                let bottomTrackDuration = millisToMinutesAndSeconds(tracksData[tracksData.length - 1].duration) + " (" + tracksData[tracksData.length - 1].name + ")";
                $("#longest-track_response").html(topTrackDuration);
                $("#shortest-track_response").html(bottomTrackDuration);
                $("#average-track_response").html(averageDuration);
                $("#total-track_response").html(totalDurationTime);
            }
        });
    } else {

    }
}