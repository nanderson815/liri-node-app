console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    key: process.env.OMDb_KEY
}

exports.bands = {
    key: process.env.BAND_KEY
}