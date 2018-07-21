require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

var Spotify = require("node-spotify-api");
var nodeArg = process.argv;
var action = nodeArg[2];


var spotify = new Spotify(keys.spotify);

console.log(spotify);

function spotifyAPI() {
    var args = {type: "track", query: nodeArg[3]}

    spotify.search(args, function(error,data){
        console.log(data);
        var response = data.tracks.items;
        var artist = JSON.parse(body).response.artists.name;
        var song = JSON.parse(body).response.name;
        var link = JSON.parse(body).response.album.href;
        var album = JSON.parse(body).response.album.name;


        if (error) throw error;

        if (!error){
            console.log("----------------");
            console.log("\nArtist: " + artist);
            console.log("\n----------------");
            console.log("\nTitle of Song: " + song);
            console.log("\n----------------");
            console.log("\nLink to song: " + link);
            console.log("\n----------------");
            console.log("\nAlbum name: " + album);
        }
    })
}




if (action === "spotify-this-song"){
    spotifyAPI();
}