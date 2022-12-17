let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
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

let div = document.querySelector("div#date");
div.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-value").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-value").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "f029b2b922567275529f515833feaaac";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-input").value;
  search(city);
}

function retrievePosition(position) {
  let units = "metric";
  let apiKey = "f029b2b922567275529f515833feaaac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 77;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 25;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function currentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", currentLocation);

search("New York");
