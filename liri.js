require("dotenv").config();

var moment = require('moment');
// moment().format();

var axios = require('axios');

var Spotify = require('node-spotify-api');

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

var omdb = keys.omdb;

var bandsKey = keys.bands.key;

// console.log(bandsKey);

// console.log(keys.spotify);
// console.log(omdb);

var command = process.argv[2];


// Bands in Town Command ----------------------------------------------------------------------------------------------
if (command === "concert-this") {
    var band = process.argv[3];

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
if (command === "spotify-this-song") {
    var track = process.argv[3]

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




