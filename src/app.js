const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//  console.log(__dirname); 
//  this will log the current absolute path of the src folder
// console.log(path.join(__dirname, '../public'));

let d = new Date();

const app = express();

//Setup Handlebars Engine
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../partials'));

//Setup static directory to serve, you can put static html pages here
app.use(express.static(path.join(__dirname, '../public'))); //this is the reason why hbs is able to access the css from here

app.get('', (req, res) => {
    res.render('index', { //here I am rendering a dynamic page by sending the object, the style and js still comes from public folder.
        day: d.getDate(),
        month: d.getMonth()+1
    });
})

app.get('/about', (req, res) => {
    res.render('about', {              //here I am rendering a dynamic page by sending the object
        title: 'About Page',
        name: 'Antony Chiramel'
    })
})

app.get('/help', (req, res) => {
    res.render('help')          //here I am serving a static page
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (errG, { location, latitude, longitude} = {}) => {
        if(errG) {
            return res.send({
                error: errG
            })
        } else {
            forecast(latitude, longitude, (errF, { temperature, weather_descriptions: description} = {}) => {
                if(errF) {
                    return res.send({
                        error: errF
                    })
                } else {
                    res.send({
                        location: location,
                        temperature: temperature,
                        forecast: description[0]
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        page: '/help'
    })
})

app.get('*', (req, res) => {    //match everything other than whats matched above
    res.render('404', {
        title: 'Home',
        page: '/'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});