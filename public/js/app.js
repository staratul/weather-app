// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageZero = document.getElementById('message-0');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const messageThree = document.getElementById('message-3');
const messageFour = document.getElementById('message-4');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            } else {
                messageZero.textContent = `Your Locations is: "${data.address}", and current time is: "${data.current_time}"`;
                messageOne.textContent = 'Sunrise time: ' + data.sunrise;
                messageTwo.textContent = 'Sunset time: ' + data.sunset;
                messageThree.textContent = `Wind kph is: "${data.wind_kph}" and wind direction is: "${data.wind_dir}"`;
                messageFour.textContent = `Current temperature in celsius is: "${data.temperature_celsius}" and temperature in fahrenheit is : "${data.temperature_fahrenheit}"`
            }
        });
    });
});