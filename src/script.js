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

//Next days dates
function setTimeInOneDay() {
  let dayInOneDay = new Date(currentTime);
  dayInOneDay.setDate(currentTime.getDate() + 1);

  let weekday = document.querySelector("#weekday-in-one-day");
  weekday.innerHTML = weekdays[dayInOneDay.getDay()];

  let date = document.querySelector("#date-in-one-day");
  let day = String(dayInOneDay.getDate()).padStart(2, "0");
  let month = String(dayInOneDay.getMonth() + 1).padStart(2, "0");

  date.innerHTML = `${day}/${month}`;
}

setTimeInOneDay();

function setTimeInTwoDays() {
  let dayInTwoDays = new Date(currentTime);
  dayInTwoDays.setDate(currentTime.getDate() + 2);

  let weekday = document.querySelector("#weekday-in-two-days");
  weekday.innerHTML = weekdays[dayInTwoDays.getDay()];

  let date = document.querySelector("#date-in-two-days");
  let day = String(dayInTwoDays.getDate()).padStart(2, "0");
  let month = String(dayInTwoDays.getMonth() + 1).padStart(2, "0");

  date.innerHTML = `${day}/${month}`;
}

setTimeInTwoDays();

function setTimeInThreeDays() {
  let dayInThreeDays = new Date(currentTime);
  dayInThreeDays.setDate(currentTime.getDate() + 3);

  let weekday = document.querySelector("#weekday-in-three-days");
  weekday.innerHTML = weekdays[dayInThreeDays.getDay()];

  let date = document.querySelector("#date-in-three-days");
  let day = String(dayInThreeDays.getDate()).padStart(2, "0");
  let month = String(dayInThreeDays.getMonth() + 1).padStart(2, "0");

  date.innerHTML = `${day}/${month}`;
}

setTimeInThreeDays();

function setTimeInFourDays() {
  let dayInFourDays = new Date(currentTime);
  dayInFourDays.setDate(currentTime.getDate() + 4);

  let weekday = document.querySelector("#weekday-in-four-days");
  weekday.innerHTML = weekdays[dayInFourDays.getDay()];

  let day = String(dayInFourDays.getDate()).padStart(2, "0");
  let month = String(dayInFourDays.getMonth() + 1).padStart(2, "0");

  let date = document.querySelector("#date-in-four-days");
  date.innerHTML = `${day}/${month}`;
}

setTimeInFourDays();

//weatherApi
let apiKey = "4004c8123fed687c059e5362ad5e8262";

let cityName = document.querySelector("#city-name");
let weatherType = document.querySelector("#weather-type");
let currentTemp = document.querySelector("#current-degrees");

let humid = document.querySelector("#humid-current");
let wind = document.querySelector("#wind-current");

let todayMaxTemp = document.querySelector("#today-max-degrees");
let todayMinTemp = document.querySelector("#today-min-degrees");

let maxTempTwo = document.querySelector("#max-degrees-second");
let minTempTwo = document.querySelector("#min-degrees-second");

let maxTempThree = document.querySelector("#max-degrees-third");
let minTempThree = document.querySelector("#min-degrees-third");

let maxTempFour = document.querySelector("#max-degrees-fourth");
let minTempFour = document.querySelector("#min-degrees-fourth");

let maxTempFive = document.querySelector("#max-degrees-fifth");
let minTempFive = document.querySelector("#min-degrees-fifth");

function makePositiveDegrees(number) {
  if (number > 0) {
    number = "+" + number;
  }
  return number;
}

//weather functions

function ForecastChange(response) {
  let maxTemp = Math.round(response.data.daily[0].temp.max);
  todayMaxTemp.innerHTML = makePositiveDegrees(maxTemp);
  let minTemp = Math.round(response.data.daily[0].temp.min);
  todayMinTemp.innerHTML = makePositiveDegrees(minTemp);

  let maxTempSecond = Math.round(response.data.daily[1].temp.max);
  maxTempTwo.innerHTML = makePositiveDegrees(maxTempSecond);
  let minTempSecond = Math.round(response.data.daily[1].temp.min);
  minTempTwo.innerHTML = makePositiveDegrees(minTempSecond);
  let iconDayTwoId = response.data.daily[1].weather[0].icon;
  let iconDayTwo = document.querySelector("#icon-in-one-day");
  iconDayTwo.setAttribute("src", `images/${iconDayTwoId}.png`);

  let maxTempThird = Math.round(response.data.daily[2].temp.max);
  maxTempThree.innerHTML = makePositiveDegrees(maxTempThird);
  let minTempThird = Math.round(response.data.daily[2].temp.min);
  minTempThree.innerHTML = makePositiveDegrees(minTempThird);
  let iconDayThreeId = response.data.daily[2].weather[0].icon;
  let iconDayThree = document.querySelector("#icon-in-two-days");
  iconDayThree.setAttribute("src", `images/${iconDayThreeId}.png`);

  let maxTempFourth = Math.round(response.data.daily[3].temp.max);
  maxTempFour.innerHTML = makePositiveDegrees(maxTempFourth);
  let minTempFourth = Math.round(response.data.daily[3].temp.min);
  minTempFour.innerHTML = makePositiveDegrees(minTempFourth);
  let iconDayFourId = response.data.daily[3].weather[0].icon;
  let iconDayFour = document.querySelector("#icon-in-three-days");
  iconDayFour.setAttribute("src", `images/${iconDayFourId}.png`);

  let maxTempFifth = Math.round(response.data.daily[4].temp.max);
  maxTempFive.innerHTML = makePositiveDegrees(maxTempFifth);
  let minTempFifth = Math.round(response.data.daily[4].temp.min);
  minTempFive.innerHTML = makePositiveDegrees(minTempFifth);
  let iconDayFiveId = response.data.daily[4].weather[0].icon;
  let iconDayFive = document.querySelector("#icon-in-four-days");
  iconDayFive.setAttribute("src", `images/${iconDayFiveId}.png`);
}

function weatherChange(response) {
  cityName.innerHTML = response.data.name;

  weatherType.innerHTML = response.data.weather[0].main;

  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let iconID = response.data.weather[0].icon;
  let icon = document.querySelector("#current-icon");
  let iconAdress = `images/${iconID}.png`;
  icon.setAttribute("src", iconAdress);

  humid.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);

  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;

  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,current&appid=${apiKey}`;
  axios.get(apiForecastUrl).then(ForecastChange);
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

function startCity() {
  let startCity = "Berlin";
  changeWeatherByCityName(startCity);
}
startCity();
//Celsius or Fahrenheit
let celsButton = document.querySelector("#cels-button");
//let fahrButton = document.querySelector("#fahr-button");
celsButton.focus();
