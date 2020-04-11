const request = require('request');



const forecast = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=ba5b17f828b343d580a32958200704&q='+address+'&days=1'

    request({ url, json: true}, (err, { body } = {}) => {
        if(err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error || body.forecast.forecastday.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            console.log(body);
            callback(undefined, {
                temperature_celsius: body.current.temp_c,
                temperature_fahrenheit: body.current.temp_f,
                sunrise: body.forecast.forecastday[0].astro.sunrise,
                sunset: body.forecast.forecastday[0].astro.sunset,
                moonrise: body.forecast.forecastday[0].astro.moonrise,
                moonset: body.forecast.forecastday[0].astro.moonset,
                current_time: body.location.localtime,
                wind_kph: body.current.wind_kph,
                wind_dir: body.current.wind_dir
            });
        }
    });
}

module.exports = forecast;