let currentTime = new Date();
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//Current time
function getCurrentTime() {
  let weekday = weekdays[currentTime.getDay()];
  let hour = String(currentTime.getHours()).padStart(2, "0");
  let minutes = String(currentTime.getMinutes()).padStart(2, "0");

  let time = document.querySelector("#current-city-time");
  time.innerHTML = `${weekday} ${hour}:${minutes}`;
}
getCurrentTime();

//weatherApi
let apiKey = "4004c8123fed687c059e5362ad5e8262";

let cityName = document.querySelector("#city-name");
let weatherType = document.querySelector("#weather-type");

let currentTemp = document.querySelector("#current-degrees");

let humid = document.querySelector("#humid-current");
let wind = document.querySelector("#wind-current");

let todayMaxTemp = document.querySelector("#today-max-degrees");
let todayMinTemp = document.querySelector("#today-min-degrees");

function makePositiveDegrees(number) {
  if (number > 0) {
    number = "+" + number;
  }
  return number;
}

//weather functions

function showForecast(response) {
  todayMaxTempDegrees = makePositiveDegrees(
    Math.round(response.data.daily[0].temp.max)
  );
  todayMinTempDegrees = makePositiveDegrees(
    Math.round(response.data.daily[0].temp.min)
  );

  todayMaxTemp.innerHTML = todayMaxTempDegrees;
  todayMinTemp.innerHTML = todayMinTempDegrees;

  let forecastElement = document.querySelector(".forecast");
  let forecastHTML = ``;

  let days = [1, 2, 3, 4];
  days.forEach(function (day) {
    let futureTime = new Date(currentTime);
    futureTime.setDate(currentTime.getDate() + day);

    let nextWeekday = weekdays[futureTime.getDay()];
    let nextDate = String(futureTime.getDate()).padStart(2, "0");
    let nextMonth = String(futureTime.getMonth() + 1).padStart(2, "0");

    let nextIconID = response.data.daily[day].weather[0].icon;

    let maxDegrees = makePositiveDegrees(
      Math.round(response.data.daily[day].temp.max)
    );

    let minDegrees = makePositiveDegrees(
      Math.round(response.data.daily[day].temp.min)
    );

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
          <span>${maxDegrees}</span>°
          <hr />
          <span>${minDegrees}</span>°
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

  degreesCelsius = makePositiveDegrees(Math.round(response.data.main.temp));
  currentTemp.innerHTML = degreesCelsius;

  let iconID = response.data.weather[0].icon;
  let icon = document.querySelector("#current-icon");
  let iconAdress = `images/${iconID}.png`;
  icon.setAttribute("src", iconAdress);

  humid.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);

  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;

  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,current&appid=${apiKey}`;
  axios.get(apiForecastUrl).then(showForecast);
}

//forecastHTML
function getForecast() {}
getForecast();

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

//Celsius or Fahrenheit

let degreesCelsius = null;
let todayMaxTempDegrees = null;
let todayMinTempDegrees = null;
let maxTempDegreesDayTwo = null;
let minTempDegreesDayTwo = null;
let maxTempDegreesDayThree = null;
let minTempDegreesDayThree = null;
let maxTempDegreesDayFour = null;
let minTempDegreesDayFour = null;
let maxTempDegreesDayFive = null;
let minTempDegreesDayFive = null;

let celsButton = document.querySelector("#cels-button");
let fahrButton = document.querySelector("#fahr-button");
celsButton.focus();

function convertToFahr(degrees) {
  celsButton.classList.remove("active");
  fahrButton.classList.add("active");
  let degreesFahr = makePositiveDegrees(Math.round(degrees * 1.8 + 32));
  return degreesFahr;
}

function displayDegreesInFahr() {
  currentTemp.innerHTML = convertToFahr(degreesCelsius);

  todayMaxTemp.innerHTML = convertToFahr(todayMaxTempDegrees);
  todayMinTemp.innerHTML = convertToFahr(todayMinTempDegrees);

  maxTempTwo.innerHTML = convertToFahr(maxTempDegreesDayTwo);
  minTempTwo.innerHTML = convertToFahr(minTempDegreesDayTwo);

  maxTempThree.innerHTML = convertToFahr(maxTempDegreesDayThree);
  minTempThree.innerHTML = convertToFahr(minTempDegreesDayThree);

  maxTempFour.innerHTML = convertToFahr(maxTempDegreesDayFour);
  minTempFour.innerHTML = convertToFahr(minTempDegreesDayFour);

  maxTempFive.innerHTML = convertToFahr(maxTempDegreesDayFive);
  minTempFive.innerHTML = convertToFahr(minTempDegreesDayFive);
}

function displayDegreesInCels() {
  celsButton.classList.add("active");
  fahrButton.classList.remove("active");
  currentTemp.innerHTML = degreesCelsius;

  todayMaxTemp.innerHTML = todayMaxTempDegrees;
  todayMinTemp.innerHTML = todayMinTempDegrees;

  maxTempTwo.innerHTML = maxTempDegreesDayTwo;
  minTempTwo.innerHTML = minTempDegreesDayTwo;

  maxTempThree.innerHTML = maxTempDegreesDayThree;
  minTempThree.innerHTML = minTempDegreesDayThree;

  maxTempFour.innerHTML = maxTempDegreesDayFour;
  minTempFour.innerHTML = minTempDegreesDayFour;

  maxTempFive.innerHTML = maxTempDegreesDayFive;
  minTempFive.innerHTML = minTempDegreesDayFive;
}

fahrButton.addEventListener("click", displayDegreesInFahr);
celsButton.addEventListener("click", displayDegreesInCels);
