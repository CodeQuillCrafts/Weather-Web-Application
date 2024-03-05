const weatherContainer = document.querySelector(".weather-container");
// search form
const searchInput = document.querySelector("#search");
const submitInput = document.querySelector("#submit");
// info
const weatherDescriptionElement = document.querySelector("#weather-description");
const temperatureElement = document.querySelector("#temperature");
const humidityElement = document.querySelector("#humidity");
const rainChancesElement = document.querySelector("#rain-chances");
const suggestionsElement = document.querySelector("#suggestions");
const errorMsgElement = document.querySelector("#error-message");

submitInput.addEventListener("click", function (e) {
    e.preventDefault();
    const apiKey = '8eaa52d58bb955b72cc8e5112a4fc784';
    const location = searchInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherDesc = data.weather[0].description;
            const temp = data.main.temp;
            const humid = data.main.humidity;
            const rain = data.rain ? `Rain Chances: ${data.rain['1h']}mm` : 'No Rain';
            const suggestions = getWeatherSuggestions(temp);

            weatherDescriptionElement.innerText = `Weather: ${weatherDesc}`;
            temperatureElement.innerText = `Temperature: ${temp}°C`;
            humidityElement.innerText = `Humidity: ${humid}%`;
            rainChancesElement.innerText = rain;
            suggestionsElement.innerText = `Suggestions: ${suggestions.join(', ')}`;
            errorMsgElement.innerText = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherDescriptionElement.innerText = '';
            temperatureElement.innerText = '';
            humidityElement.innerText = '';
            rainChancesElement.innerText = '';
            suggestionsElement.innerText = '';
            errorMsgElement.innerText = `Error fetching weather data: ${error.message}`;
        });
});

function getWeatherSuggestions(temperature) {
    if (temperature < 10) {
        return ['Wear a heavy jacket', 'Bring an umbrella'];
    } else if (temperature < 20) {
        return ['Bring a light jacket', 'Consider an umbrella'];
    } else {
        return ['Enjoy the weather', 'Sunscreen might be a good idea'];
    }
}
