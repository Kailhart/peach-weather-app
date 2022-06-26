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
  todayMaxTempDegrees = makePositiveDegrees(
    Math.round(response.data.daily[0].temp.max)
  );
  todayMinTempDegrees = makePositiveDegrees(
    Math.round(response.data.daily[0].temp.min)
  );
  maxTempDegreesDayTwo = makePositiveDegrees(
    Math.round(response.data.daily[1].temp.max)
  );
  minTempDegreesDayTwo = makePositiveDegrees(
    Math.round(response.data.daily[1].temp.min)
  );
  maxTempDegreesDayThree = makePositiveDegrees(
    Math.round(response.data.daily[2].temp.max)
  );
  minTempDegreesDayThree = makePositiveDegrees(
    Math.round(response.data.daily[2].temp.min)
  );
  maxTempDegreesDayFour = makePositiveDegrees(
    Math.round(response.data.daily[3].temp.max)
  );
  minTempDegreesDayFour = makePositiveDegrees(
    Math.round(response.data.daily[3].temp.min)
  );
  maxTempDegreesDayFive = makePositiveDegrees(
    Math.round(response.data.daily[4].temp.max)
  );
  minTempDegreesDayFive = makePositiveDegrees(
    Math.round(response.data.daily[4].temp.min)
  );

  todayMaxTemp.innerHTML = todayMaxTempDegrees;
  todayMinTemp.innerHTML = todayMinTempDegrees;

  maxTempTwo.innerHTML = maxTempDegreesDayTwo;
  minTempTwo.innerHTML = minTempDegreesDayTwo;
  let iconDayTwoId = response.data.daily[1].weather[0].icon;
  let iconDayTwo = document.querySelector("#icon-in-one-day");
  iconDayTwo.setAttribute("src", `images/${iconDayTwoId}.png`);

  maxTempThree.innerHTML = maxTempDegreesDayThree;
  minTempThree.innerHTML = minTempDegreesDayThree;
  let iconDayThreeId = response.data.daily[2].weather[0].icon;
  let iconDayThree = document.querySelector("#icon-in-two-days");
  iconDayThree.setAttribute("src", `images/${iconDayThreeId}.png`);

  maxTempFour.innerHTML = maxTempDegreesDayFour;
  minTempFour.innerHTML = minTempDegreesDayFour;
  let iconDayFourId = response.data.daily[3].weather[0].icon;
  let iconDayFour = document.querySelector("#icon-in-three-days");
  iconDayFour.setAttribute("src", `images/${iconDayFourId}.png`);

  maxTempFive.innerHTML = maxTempDegreesDayFive;
  minTempFive.innerHTML = minTempDegreesDayFive;
  let iconDayFiveId = response.data.daily[4].weather[0].icon;
  let iconDayFive = document.querySelector("#icon-in-four-days");
  iconDayFive.setAttribute("src", `images/${iconDayFiveId}.png`);
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
