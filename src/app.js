function formatDate(timestamp) {
  let date = new Date (timestamp)
    let hours = date.getHours();
    
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;
}
   function formatHours(timestamp){
    let date = new Date (timestamp)
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
     return`${hours}:${minutes}`
   }
  
  function displayWeatherCondition(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#mesto")
    let descritionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descritionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description)
  }
  function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.list[0];
       forecastElement.innerHTML=`
      
            <ul>
              <li>
                <strong>${formatHours(forecast.dt * 1000)}</strong><br /><span class="weather-forecast-temperature">${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°</span><img
                  src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                /><br />
              </li>`;

              forecast = response.data.list[1];
              forecastElement.innerHTML+=`
              <li>
              <strong>${formatHours(forecast.dt * 1000)}</strong><br /><span class="weather-forecast-temperature">${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°</span>
                <img
                src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                /><br />
              </li>`

              forecast = response.data.list[2];
              forecastElement.innerHTML+=`
              <li>
              <strong>${formatHours(forecast.dt * 1000)}</strong><br /><span class="weather-forecast-temperature">${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°</span><img
              src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                /><br />
              </li>`

              forecast = response.data.list[3];
              forecastElement.innerHTML+=`
              <li>
              <strong>${formatHours(forecast.dt * 1000)}</strong><br /><span class="weather-forecast-temperature">${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°</span>
                <img
                src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                /><br />
              </li>`

              forecast = response.data.list[4];
              forecastElement.innerHTML+=`
              <li>
              <strong>${formatHours(forecast.dt * 1000)}</strong><br /><span class="weather-forecast-temperature">${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°</span><img
              src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                /><br />
              </li>
           
            </ul>
        
          </div>`;
  
  
            }  
  


  function searchCity(city) {
    let apiKey = "6b8b1bd45ebc6006cd94529030eb9409";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);

    apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#town-city").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "6b8b1bd45ebc6006cd94529030eb9409";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature=(celsiusTemperature *9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }

let celsiusTemperature = null;

  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#search-city");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click",getCurrentLocation);
  
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);

searchCity("London");