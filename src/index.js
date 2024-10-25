function showTemp(response){
    let tempElement = document.querySelector("#degree");
    let temp = response.data.temperature.current;
    tempElement.innerHTML = Math.round(temp.value);
    console.log(temp);
}

function searchCity(city) {
  let apiKey = "736746t37o0a4075f6772e4f9dc8291b";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(showTemp);
}

function searchInfo(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-box");
  let cityElement = document.querySelector("#city-display");
  cityElement.innerHTML = searchCity.value;
  searchCity(searchCity.value);
}

let searchBtnElement = document.querySelector("#search-form");
searchBtnElement.addEventListener("submit", searchInfo);
