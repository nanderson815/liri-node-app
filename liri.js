require("dotenv").config();

var moment = require('moment');
moment().format();

var axios = require('axios');

var Spotify = require('node-spotify-api');

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

var omdb = keys.omdb;

var bandsKey = keys.bands.key;

// console.log(bandsKey);

// console.log(spotify);
// console.log(omdb);

var command = process.argv[2];


// Bands in Town Command
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




