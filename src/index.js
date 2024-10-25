function showInfo(event){
    event.preventDefault();
    let city = document.querySelector("#input-box");
    let cityElement = document.querySelector("#city-display");
    cityElement.innerHTML = city.value;
}

let searchBtnElement = document.querySelector("#search-form");
searchBtnElement.addEventListener("submit", showInfo);