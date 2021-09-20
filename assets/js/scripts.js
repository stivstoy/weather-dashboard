var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city-search");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var forecastDisplay1 = document.querySelector("#forecast1");
var forecastDisplay2 = document.querySelector("#forecast2");
var forecastDisplay3 = document.querySelector("#forecast3");
var forecastDisplay4 = document.querySelector("#forecast4");
var forecastDisplay5 = document.querySelector("#forecast5");
var cityRow = document.getElementById("save-city");
var cities = [];
var savedCity;
var btn = document.getElementById("btn");

//checking for local storage
if (JSON.parse(window.localStorage.getItem('cityList'))) {
    cities = JSON.parse(window.localStorage.getItem('cityList'));    
}
else {
   cities = [];
}

displayCities();

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var citySearch = nameInputEl.value.trim();

  if (citySearch) {
   
    getCurrentWeather(citySearch);
    getForecastWeather(citySearch);
    storeCity(citySearch);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

// Get weather for the current date
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

// Display current day weather
  var displayCurrentWeather = function(currentWeather) {
    
 
    let unix_timestamp = currentWeather.dt;
    var cDate = new Date(unix_timestamp * 1000);
    var month = cDate.getMonth() + 1;
    var day = cDate.getDate();
    var year = cDate.getFullYear();
    var currentDate = month+'/'+day+'/'+year;
 

   repoSearchTerm.innerHTML = "<br>" + currentWeather.name + " ("+ currentDate  +") <img src='http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png'>";
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
          displayForecast(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

// Display 5-day forecast
var displayForecast = function(forecast) {
    // Day one
    var getDate1 = forecast.list[0].dt_txt; 
    var displayDate1= moment(getDate1).format('MM/DD/YYYY');
    forecastDisplay1.innerHTML = "<B>" +displayDate1+ "</B> <br> <img src='http://openweathermap.org/img/w/" + forecast.list[0].weather[0].icon + ".png'> <br> Temp: "+forecast.list[0].main.temp + " &deg;F<br> Wind: "+forecast.list[0].wind.speed + " MPH <br> Humidity: "+forecast.list[0].main.humidity + "%";

 // Day two
 var getDate2 = forecast.list[8].dt_txt; 
 var displayDate2= moment(getDate2).format('MM/DD/YYYY');
 forecastDisplay2.innerHTML = "<B>" +displayDate2+ "</B> <br> <img src='http://openweathermap.org/img/w/" + forecast.list[8].weather[0].icon + ".png'> <br> Temp: "+forecast.list[8].main.temp + " &deg;F<br> Wind: "+forecast.list[8].wind.speed + " MPH <br> Humidity: "+forecast.list[8].main.humidity + "%";

  // Day three
  var getDate3 = forecast.list[16].dt_txt; 
  var displayDate3= moment(getDate3).format('MM/DD/YYYY');
  forecastDisplay3.innerHTML = "<B>" +displayDate3+ "</B> <br> <img src='http://openweathermap.org/img/w/" + forecast.list[16].weather[0].icon + ".png'> <br> Temp: "+forecast.list[16].main.temp + " &deg;F<br> Wind: "+forecast.list[16].wind.speed + " MPH <br> Humidity: "+forecast.list[16].main.humidity + "%";

   // Day four
   var getDate4 = forecast.list[24].dt_txt; 
   var displayDate4= moment(getDate4).format('MM/DD/YYYY');
   forecastDisplay4.innerHTML = "<B>" +displayDate4+ "</B> <br> <img src='http://openweathermap.org/img/w/" + forecast.list[24].weather[0].icon + ".png'> <br> Temp: "+forecast.list[24].main.temp + " &deg;F<br> Wind: "+forecast.list[24].wind.speed + " MPH <br> Humidity: "+forecast.list[24].main.humidity + "%";

    // Day five
    var getDate5 = forecast.list[32].dt_txt; 
    var displayDate5= moment(getDate5).format('MM/DD/YYYY');
    forecastDisplay5.innerHTML = "<B>" +displayDate5+ "</B> <br> <img src='http://openweathermap.org/img/w/" + forecast.list[32].weather[0].icon + ".png'> <br> Temp: "+forecast.list[32].main.temp + " &deg;F<br> Wind: "+forecast.list[32].wind.speed + " MPH <br> Humidity: "+forecast.list[32].main.humidity + "%";

  }
 
// function to store city searches
function storeCity(citySearch) {
    const cityDataObj = {
        city: citySearch
        
    }
 
     cities.push(cityDataObj);
     console.log(cities);
     window.localStorage.setItem('cityList', JSON.stringify(cities));
     window.localStorage.getItem('cityList');
      JSON.parse(window.localStorage.getItem('cityList'));
     displayCities();
   
}

// function to display stored city searches
function displayCities() {
    var text = '';
    for (var i = 0; i < cities.length; i++) {
       
       var options = text +=  "<button  id=" +cities[i].city+  " onclick='searchCity("+JSON.stringify(cities[i].city)+")'>" +cities[i].city+"</button> <br>";
        cityRow.innerHTML = options;     
       
        
        }
        
    }
// retrieve stored city searches
function searchCity(savedCity){
    
    getCurrentWeather( savedCity);
    getForecastWeather( savedCity);
    
}
 
// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);
