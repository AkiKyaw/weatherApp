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
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"  />`;
  
  // date
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  dateElement.innerHTML = formatDate(date);
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
