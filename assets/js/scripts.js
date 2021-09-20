var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city-search");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var forecastDisplay = document.querySelector("#forecast");

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var citySearch = nameInputEl.value.trim();

  if (citySearch) {
   
    getCurrentWeather(citySearch);
    getForecastWeather(citySearch);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var getCurrentWeather = function(cityname) {


    var apiCurrentUrl =  "https://api.openweathermap.org/data/2.5/weather?q="+ cityname+ "&units=imperial&appid=2176a5b44b8cc86cad4460be2565011f"
  
    // make a get request to url
    fetch(apiCurrentUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(currentWeather) {
            console.log(currentWeather);
            displayCurrentWeather(currentWeather, cityname);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect");
      });
  };

  var displayCurrentWeather = function(currentWeather, searchTerm) {
    
 
    let unix_timestamp = currentWeather.dt;
    var cDate = new Date(unix_timestamp * 1000);
    var month = cDate.getMonth() + 1;
    var day = cDate.getDate();
    var year = cDate.getFullYear();
    var currentDate = month+'/'+day+'/'+year;
 

   repoSearchTerm.innerHTML = "<br>" + searchTerm + " ("+ currentDate  +") <img src='http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png'>";
   repoContainerEl.innerHTML = "Temp: "+currentWeather.main.temp + " &deg;F<br> Wind: "+currentWeather.wind.speed + " MPH <br> Humidity: "+currentWeather.main.humidity + "%";
 
  
  
  }  

// 5-day Forecast

var getForecastWeather = function(cityname) {


  var apiUrl =  "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname+ "&units=imperial&appid=2176a5b44b8cc86cad4460be2565011f"

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayForecast(data, cityname);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

var displayForecast = function(forecast, searchTerm) {
    var getDate = forecast.list[0].dt_txt; 
    var displayDate1= moment(getDate).format('MM/DD/YYYY');
    forecastDisplay.innerHTML = "<B>" +displayDate1+ "</B> <br> <img src='http://openweathermap.org/img/w/" + forecast.list[0].weather[0].icon + ".png'> <br> Temp: "+forecast.list[0].main.temp + " &deg;F<br> Wind: "+forecast.list[0].wind.speed + " MPH <br> Humidity: "+forecast.list[0].main.humidity + "%";


  }
 

// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);
