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

function showTemperatureC(no) {
  console.log(no.data);
  let temperature = document.querySelector("#temperature");
  let roundTemperature = Math.round(no.data.main.temp);
  temperature.innerHTML = `${roundTemperature}`;
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
}

function geoInfo(response) {
  console.log(response.data.name);
  let latitude = response.data[0].lat;
  let longtitude = response.data[0].lon;
  let apiKey = "2065f51b78f51fb9f65c3557ebb73d5b";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(showTemperatureC);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
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

let cityName = document.querySelector("#search-city");
cityName.addEventListener("submit", search);

start("Isfahan");

function showCurrentLocation(data) {
  let currentLatitude = data.coords.latitude;
  let currentLongtitude = data.coords.longitude;
  let apiKey = "2065f51b78f51fb9f65c3557ebb73d5b";
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongtitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(showTemperatureC);
}

function showCurrentCoord() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentCoord);
