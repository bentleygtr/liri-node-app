require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var request = require("request");

Spotify = require("node-spotify-api");
var nodeArg = process.argv;
var action = nodeArg[2];
var searchTerms = process.argv.slice(3).join(" ");
var divider = "\n\n───────────────────────────────────────────";


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



function spotifyAPI() {
    
    var args = {type: 'track', query: searchTerms}

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

function movieAPI () {
    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerms + "&y=&plot=short&apikey=trilogy"

    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            var jsonData = JSON.parse(body);
            //console.log(jsonData);
            var title = jsonData.Title;
            var year = jsonData.Year;
            var ratingIMDB = jsonData.imdbRating;
            var ratingRotten = jsonData.tomatoMeter;
            var country = jsonData.Country;
            var lang = jsonData.Language;
            var plot = jsonData.Plot;
            var cast = jsonData.Actors;

            var movieData = [
                "\nTitle: " + title,
                "Year: " + year,
                "IMDB Rating: " + ratingIMDB,
                "Tomato Meter: " + ratingRotten,
                "Country: " + country,
                "Language: " + lang,
                "Plot: " + plot,
                "Cast: " + cast,
            ].join("\n\n");

            // fs.appendFile("random.txt", divider + movieData, function(error){
            //     if (error) throw error;
            // })
            console.log(divider + movieData)
            //console.log(jsonData);
        }
    })
}
    function randomText () {
        fs.readFile("./random.txt", "utf-8", function(error, data){
            if (error){
                return console.log(error);
            }
            nodeArg[3] = response.data;

        })
    }
if (action === "spotify-this-song"){
    spotifyAPI();
}
 if (action === "my-tweets") {
    twitterAPI();
}
if (action === "movie-this"){
    movieAPI();
}
if (action === "do-what-it-says"){
    randomText();
}