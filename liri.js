require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const moment = require("moment");
const fs = reuire("fs");
const bandsInTownID = keys.bandsInTown.id;
const ombID = keys.omdb.id;


// Store all of the arguments in an array
var nodeArgs = process.argv;

// command to run from arguments
const command = process.argv[2;]

const query = process.argv.slice(3).join("");


// const commands = {
//     "spotify-this-song": new Command(logSpotifySongData),
//     "movie-this": new Command(logOMDBData),
//     "concert-this": new Command(logBandsInTownData),
//     "do-what-it-says": new Command(doWhatItSays)
// }


// USE AXIOS TO LOG MOVIES
// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  }
);



// Create all the variables that pull in the node commands
var command = process.argv[2];
var thing = process.argv[3];

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: 'f031ff546b2a4c5b85e944fba2e40c7f',
    secret: '3bd4f4aceb934b07b85a17de0a0441c0'
    });
var request = require('request');
var fs = require("fs");

//Switch break statement to direct to the next function the user wanted
switch (command) {
    case 'spotify-this-song':
        spotifyThis(thing);
        break;
    case 'movie-this':
        movieThis(thing);
        break;
    case 'do-what-it-says':
        random();
        break;
}


//Spotify function START
function spotifyThis(thing) {
    //console.log("Spotify function called.");
     if (thing == null) {
        thing = 'The Sign';
    }
    spotify.search({
    	type: 'track',
    	query: thing 
    }, function(error, data) {
        if (error) {
        	console.log('Error occurred: ' + error);
        	return;
			}
            console.log('--------------------');
            console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
            console.log('Song Title: ' + data.tracks.items[0].name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('--------------------');
    });
}
//Spotify function END

//OMDB function START
function movieThis(thing) {
    //console.log("OMDB function called.");
    if (thing == null) {
        thing = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t="+thing+"http://www.omdbapi.com/?i=tt3896198&apikey=feaa6f7b", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('--------------------');
            console.log('Movie Title: ' + JSON.parse(body).Title);
            console.log('Release Year: ' + JSON.parse(body).Year);
            console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Lead Actors: ' + JSON.parse(body).Actors);
            console.log('--------------------');
        }
    });
}
//OMDB function END

function random() {
    //console.log("Read text function called.");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            //var dataArr = data.split(',');
            spotifyThis(data[1]);
        }
    //console.log(data);
    });
}