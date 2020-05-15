const request = require('request');


const geoCode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiNXRoYyIsImEiOiJjazY0bmMyZjkwMzVjM2twN3djZWdzbDFhIn0.HsTojIuyjySmspXwTAGN-w&limit=1`;
    request({url: geocodeURL, json: true}, (err, res) => {
        if(err) {
            callback(`Unable to connect to ${err.hostname}`, undefined);
        } else if(res.body.hasOwnProperty('message')){
            callback(`The error message from the API: ${res.body.message}`, undefined);
        } else if(res.body.features.length === 0) {
            callback(`I don't think there is a place on earth called ${res.body.query[0]}`, undefined);
        } else {
            const data = {
                location: res.body.features[0].place_name,
                latitude: res.body.features[0].geometry.coordinates[1],
                longitude: res.body.features[0].geometry.coordinates[0]
            }
            callback(undefined, data);
        }
    })
 }

 module.exports = geoCode;