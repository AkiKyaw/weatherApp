function showTemp(response) {
  // temp
  let tempElement = document.querySelector("#degree");
  let temp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temp);

  // city name
  let cityElement = document.querySelector("#city-display");
  cityElement.innerHTML = response.data.city;

  // condition
  let condtionElement = document.querySelector("#condition");
  condition = response.data.condition.description;
  condtionElement.innerHTML = condition;

  // humidity and wind
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = response.data.wind.speed;

  // weather emoji
  let emojiElement = document.querySelector("#weather-emoji");
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="${response.data.condition.icon}"/>`;

  // date
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  dateElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "736746t37o0a4075f6772e4f9dc8291b";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(showTemp);
}

function searchInfo(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#input-box");
  searchCity(searchedCity.value);
}

let searchBtnElement = document.querySelector("#search-form");
searchBtnElement.addEventListener("submit", searchInfo);

function formatDateForecats(timestamp){
  let date = new Date (timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "736746t37o0a4075f6772e4f9dc8291b";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(forecastWeather);
}

function forecastWeather(response) {
  let forecast = "";
  console.log(response.data.daily);
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast += `
    <div class="weather-forecast-day">
      <span class="day">${formatDateForecats(day.time)}</span>
      <img class="day-icon" src="${day.condition.icon_url}" />
      <div class="day-temp-container">
        <span class="day-temp-highest">${Math.round(
          day.temperature.maximum
        )}°</span>
        <span class="day-temp-lowest">${Math.round(
          day.temperature.minimum
        )}°</span>
      </div>
    </div>
    `;
    }
  });
  

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecast;
}

searchCity("Yangon");
forecastWeather("Yangon");
