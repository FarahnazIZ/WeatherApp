function callDate(timestamp) {
  let now = new Date(timestamp);
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

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

  return `${day} ${hours}:${minutes}`;
}

function callDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecast");
  let forecastResponse = response.data.daily;
  let forecastHTML = `<div class="row justify-content-center">`;

  forecastResponse.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecastWeather">
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                day.condition.icon
              }.png"
              width="70px"
            />
            <div class="forecastDay">${callDay(day.time)}</div>
            <div class="forecastTemperature">
              <span class="forecastTemperatureMin">${Math.round(
                day.temperature.minimum
              )}°</span>–<span
                class="forecastTemperatureMax"
                >${Math.round(day.temperature.maximum)}°</span
              >
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `<div/>`;
  forecast.innerHTML = forecastHTML;
}

function displayTemperature(no) {
  console.log(no.data);
  let temperature = document.querySelector("#temperature");
  celsiusTemperature = no.data.temperature.current;
  temperature.innerHTML = Math.round(celsiusTemperature);
  let weather = document.querySelector("#weather");
  let changeWeather = no.data.condition.description;
  weather.innerHTML = `${changeWeather}`;
  let humidity = document.querySelector("#humidity");
  let changeHumidity = no.data.temperature.humidity;
  humidity.innerHTML = `${changeHumidity}`;
  let windSpeed = document.querySelector("#wind-speed");
  let changeWindSpeed = Math.round(no.data.wind.speed);
  windSpeed.innerHTML = `${changeWindSpeed}`;
  let currentLocation = no.data.city;
  let changeCity = document.querySelector("#city");
  changeCity.innerHTML = `${currentLocation}`;
  let icon = document.querySelector("#icon");
  let changeIcon = no.data.condition.icon;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${changeIcon}.png`
  );
  let date = document.querySelector("#date");
  date.innerHTML = callDate(no.data.time * 1000);
}

function geoInfo(response) {
  let latitude = response.data.coordinates.latitude;
  let longtitude = response.data.coordinates.longitude;
  let apiKey = "892435254bc5d7b0f0663663abo3t153";
  let apiGeoUrl = `https://api.shecodes.io/weather/v1/current?lon=${longtitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longtitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(displayTemperature);
  axios.get(apiForecastUrl).then(displayForecast);
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
  let apiKey = "892435254bc5d7b0f0663663abo3t153";
  let apiCityUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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
  let apiKey = "892435254bc5d7b0f0663663abo3t153";
  let apiGeoUrl = `https://api.shecodes.io/weather/v1/current?lon=${currentLongtitude}&lat=${currentLatitude}&key=${apiKey}&units=metric`;
  axios.get(apiGeoUrl).then(displayTemperature);
}

function showCurrentCoord() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentCoord);
