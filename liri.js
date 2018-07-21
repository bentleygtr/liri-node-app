require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");

var Spotify = require("node-spotify-api");
var nodeArg = process.argv;
var action = nodeArg[2];


var spotify = new Spotify(keys.spotify);



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




if (action === "spotify-this-song"){
    spotifyAPI();
}