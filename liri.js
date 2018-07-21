require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");

var Spotify = require("node-spotify-api");
var nodeArg = process.argv;
var action = nodeArg[2];


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



function spotifyAPI() {
    var args = {type: 'track', query: nodeArg[3]}

    spotify.search(args, function(error, data){


        if (error) throw error;

        if (!error){
            
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("\n---------------");
            console.log("\nTitle of Song: " + data.tracks.items[0].name);
            console.log("\n---------------");
            console.log("\nLink to song: " + data.tracks.items[0].album.href);
            console.log("\n---------------");
            console.log("\nAlbum name: " + data.tracks.items[0].album.name);
        }
    })
}
function twitterAPI() {   
    var params = {
    screen_name: 'nystic5523',
    count: 20
    };
  client.get('statuses/user_timeline', params, function (error, tweets) {
    if (!error) {

        for (var i = 0; i < tweets.length; i++) {
            var date = tweets[i].created_at;
            console.log("@nystic5523: " + tweets[i].text + " Created At: " + date.substring(0, 19));

            console.log("-----------------------");
        }
    }
        });
};



if (action === "spotify-this-song"){
    spotifyAPI();
}
 if (action === "my-tweets") {
    twitterAPI();
}

