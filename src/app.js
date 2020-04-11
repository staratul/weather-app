const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define path for express cofig
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Atul Chauhan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Atul Chauhan'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help message',
        title: 'Help',
        name: 'Atul Chauhan'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "Kindly provide your address for weather information"
        });
    }

    geocode(req.query.address, (err, {text, address} = {}) => {
        if(err) {
            return res.send({
                error: err
            });
        } else {
            forecast(text, (error, {temperature_celsius, temperature_fahrenheit, sunrise, sunset} = {}) => {
                if(err) {
                    return res.send({
                        error: error
                    })
                } else {
                    return res.send({
                        temperature_celsius: temperature_celsius,
                        temperature_fahrenheit: temperature_fahrenheit,
                        sunrise: sunrise,
                        sunset: sunset,
                        address:address
                    })
                }
            })
        }
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a serach term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Atul Chauhan',
        errorMessage: 'Help Article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Atul Chauhan',
        errorMessage: 'Page not found'
    });
});


app.listen(3000, () => {
    console.log("Server started on port: 3000");
});