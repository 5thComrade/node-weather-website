const request = require('request');

const forecast = (lat, long, callback) => {
    const weatherURL = `http://api.weatherstack.com/current?access_key=07b8c425756bc8ec2acc5648710e908e&query=${lat},${long}&units=m`;
    request({url: weatherURL, json: true}, (err, res) => {   //request has several properties, we need the body property
        if(err) {
            callback(`Unable to connect to ${err.hostname}`, undefined);
        } else if(res.body.success === false){
            callback(res.body.error.info, undefined);  
        } else {
            callback(undefined, res.body.current);
        }
    })
}

module.exports = forecast;