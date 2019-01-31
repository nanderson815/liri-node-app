require("dotenv").config();
var moment = require('moment');
var axios = require('axios');
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var fs = require('fs');



// Keys
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.key;
var bandsKey = keys.bands.key;


// Bands in Town Command ----------------------------------------------------------------------------------------------
function concertThis(item) {
    var band = item;

    if (band != undefined) {
        var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=" + bandsKey;
        axios.get(URL)
            .then(function (resp) {
                for (i in resp.data) {
                    num = parseInt(i) + 1;
                    console.log("------------------ Concert " + num + " -------------------");
                    console.log(resp.data[i].venue.name);
                    console.log(resp.data[i].venue.city);
                    console.log(moment(resp.data[i].datetime).format("MM/DD/YYYY"));
                }
            })
    } else {
        console.log("Please enter a band name in quotes.");
    }
}

// Spotify Command ----------------------------------------------------------------------------------------------------
function spotifyThis(item) {
    var track = item;

    if (track === undefined) {
        track = "The Sign";
        console.log("No song chosen! Here is info on " + track);
    }

    spotify.search({
        type: 'track',
        query: track
    })
        .then(function (resp) {
            for (var i in resp.tracks.items) {
                num = parseInt(i) + 1;
                console.log("-------------------- Track: " + num + "----------------------------")
                console.log("Artist: " + resp.tracks.items[i].artists[0].name);
                console.log("Song: " + resp.tracks.items[i].name);
                console.log("Album: " + resp.tracks.items[i].album.name);
                console.log("Preview: " + resp.tracks.items[i].preview_url);

            }
        })
        .catch(function (err) {
            console.log(err);
        })

}

// Movie Command -------------------------------------------------------------------------------------------------------
function movieThis(item) {
    var movie = item;

    if (movie === undefined) {
        movie = "Mr. Nobody"
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + omdb;
    axios.get(queryUrl)
        .then(function (resp) {
            console.log(resp.data.Title);
            console.log(resp.data.Year);
            console.log("IMDB Rating: " + resp.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value);
            console.log("Country(ies) of Filming: " + resp.data.Country);
            console.log("Language: " + resp.data.Language);
            console.log("Plot: " + resp.data.Plot);
            console.log("Actors: " + resp.data.Actors);

        });

};

// Do what it says command
function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function(err, data){
        if (err){
            console.log(err);
        } else {
            var arr = (data.split(","));

            var command = arr[0];
            var item = arr[1];

            runProgram(command, item);
        }
    })
}

// Choose which function to run
function runProgram(command, item){
    switch(command){
        case 'concert-this':
            concertThis(item);
            break;
        
        case 'spotify-this-song':
            spotifyThis(item);
            break;

        case 'movie-this':
            movieThis(item);
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}


var command = process.argv[2];
var item = process.argv[3];

runProgram(command, item);
