function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = addZero(now.getHours());
let minutes = addZero(now.getMinutes());

let date = document.querySelector("#day");
date.innerHTML = `${day}`;

let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes}`;

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 forecastWeather">
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              width="70px"
            />
            <div class="forecastDay">${day}</div>
            <div class="forecastTemperature">
              <span class="forecastTemperatureMin">7°</span>–<span
                class="forecastTemperatureMax"
                >14°</span
              >
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `<div/>`;
  forecast.innerHTML = forecastHTML;
}

function displayTemperature(no) {
  console.log(no.data);
  let temperature = document.querySelector("#temperature");
  celsiusTemperature = no.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
  let weather = document.querySelector("#weather");
  let changeWeather = no.data.weather[0].description;
  weather.innerHTML = `${changeWeather}`;
  let humidity = document.querySelector("#humidity");
  let changeHumidity = no.data.main.humidity;
  humidity.innerHTML = `${changeHumidity}`;
  let windSpeed = document.querySelector("#wind-speed");
  let changeWindSpeed = Math.round(no.data.wind.speed);
  windSpeed.innerHTML = `${changeWindSpeed}`;
  let currentLocation = no.data.name;
  let changeCity = document.querySelector("#city");
  changeCity.innerHTML = `${currentLocation}`;
  let icon = document.querySelector("#icon");
  let changeIcon = no.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${changeIcon}@2x.png`
  );
}

function geoInfo(response) {
  let latitude = response.data[0].lat;
  let longtitude = response.data[0].lon;
  let apiKey = "2065f51b78f51fb9f65c3557ebb73d5b";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  let changeCity = document.querySelector("#city");
  start(city.value);
  if (city.value) {
    changeCity.innerHTML = `${city.value}`;
  } else {
    city.value = null;
    alert("Please enter a city.");
  }
}

function start(city) {
  let apiKey = "2065f51b78f51fb9f65c3557ebb73d5b";
  let apiCityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  axios.get(apiCityUrl).then(geoInfo);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let cityName = document.querySelector("#search-box");
cityName.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

start("Isfahan");
displayForecast();

function showCurrentLocation(data) {
  let currentLatitude = data.coords.latitude;
  let currentLongtitude = data.coords.longitude;
  let apiKey = "2065f51b78f51fb9f65c3557ebb73d5b";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongtitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(displayTemperature);
}

function showCurrentCoord() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentCoord);
