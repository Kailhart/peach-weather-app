let currentTime = new Date();
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let days = [1, 2, 3, 4];

//Current time
function changeTime(response) {
  currentTime = new Date(response.data.date_time);

  let weekday = weekdays[currentTime.getDay()];
  let hour = String(currentTime.getHours()).padStart(2, "0");
  let minutes = String(currentTime.getMinutes()).padStart(2, "0");

  let time = document.querySelector("#current-city-time");
  time.innerHTML = `${weekday} ${hour}:${minutes}`;
}

//weatherApi

function makePositiveDegrees(number) {
  if (number > 0) {
    number = "+" + number;
  }
  return number;
}

let apiKey = "4004c8123fed687c059e5362ad5e8262";
let geoApiKey = `ac8a1f42ca1044ff86134f9efa47abeb`;

let cityName = document.querySelector("#city-name");
let weatherType = document.querySelector("#weather-type");

let currentTemp = document.querySelector("#current-degrees");

let humid = document.querySelector("#humid-current");
let wind = document.querySelector("#wind-current");

let todayMaxTemp = document.querySelector("#today-max-degrees");
let todayMinTemp = document.querySelector("#today-min-degrees");

//weather functions

function showForecast(response) {
  let forecast = response.data.daily;

  todayMaxTemp.innerHTML = makePositiveDegrees(
    Math.round(forecast[0].temp.max)
  );
  todayMinTemp.innerHTML = makePositiveDegrees(
    Math.round(forecast[0].temp.min)
  );

  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = ``;

  days.forEach(function (day) {
    let futureTime = new Date(currentTime);
    futureTime.setDate(currentTime.getDate() + day);

    let nextWeekday = weekdays[futureTime.getDay()];
    let nextDate = String(futureTime.getDate()).padStart(2, "0");
    let nextMonth = String(futureTime.getMonth() + 1).padStart(2, "0");

    let nextIconID = forecast[day].weather[0].icon;

    let maxDegrees = makePositiveDegrees(Math.round(forecast[day].temp.max));
    let minDegrees = makePositiveDegrees(Math.round(forecast[day].temp.min));

    forecastHTML =
      forecastHTML +
      `
    <div
      class="card text-bg-light day-card col-sm-auto"
      style="max-width: 18rem"
    >
      <div class="card-header weekday">
        <div>${nextWeekday}</div>
        <div class="date text-muted">
        ${nextDate}/${nextMonth} </div>
      </div>
      <div class="card-body">
        <img width="55" src="images/${nextIconID}.png" />
        <div class="card-text degrees">
          <span">${maxDegrees}</span>°
          <hr />
          <span">${minDegrees}</span>°
        </div>
      </div>
    </div>
    `;
  });
  forecastElement.innerHTML = forecastHTML;
}

function weatherChange(response) {
  cityName.innerHTML = response.data.name;

  weatherType.innerHTML = response.data.weather[0].main;

  currentTemp.innerHTML = makePositiveDegrees(
    Math.round(response.data.main.temp)
  );

  let iconID = response.data.weather[0].icon;
  let icon = document.querySelector("#current-icon");
  icon.setAttribute("src", `images/${iconID}.png`);

  humid.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);

  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;

  let apiGeoUrl = `https://api.ipgeolocation.io/timezone?apiKey=${geoApiKey}&lat=${lat}&long=${lon}`;
  axios.get(apiGeoUrl).then(changeTime);

  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,current&appid=${apiKey}`;
  axios.get(apiForecastUrl).then(showForecast);
}

//Search city

function changeWeatherByCityName(city) {
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiWeatherUrl).then(weatherChange);
}

let form = document.querySelector("#search-form");

function showWeatherInCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  changeWeatherByCityName(city);
  form.reset();
}

form.addEventListener("submit", showWeatherInCity);

//geolocation feature
function getLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiWeatherUrl).then(weatherChange);
}

function showWeatherHere(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let navigationButton = document.querySelector("#nav-button");
navigationButton.addEventListener("click", showWeatherHere);

//starting page

changeWeatherByCityName("Berlin");
