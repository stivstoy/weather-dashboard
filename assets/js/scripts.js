



//var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=2176a5b44b8cc86cad4460be2565011f";
getWeather;

var getWeather = function() {
    // format the github api url
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=2176a5b44b8cc86cad4460be2565011f";
  
    // make a get request to url
    fetch(weatherApi)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            displayRepos(data);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to GitHub");
      });
  };