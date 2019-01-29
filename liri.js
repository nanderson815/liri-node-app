require("dotenv").config();

var moment = require('moment');
moment().format();

var axios = require('axios');

var Spotify = require('node-spotify-api');

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

var omdb = keys.omdb;

console.log(spotify);
console.log(omdb);

