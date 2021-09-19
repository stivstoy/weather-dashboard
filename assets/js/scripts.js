var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city-search");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var repoName;

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var citySearch = nameInputEl.value.trim();

  if (citySearch) {
    getWeather(citySearch);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var getWeather = function(cityname) {


  var apiUrl =  "https://api.openweathermap.org/data/2.5/forecast?q="+ cityname+"&units=imperial&appid=2176a5b44b8cc86cad4460be2565011f"

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRepos(data, cityname);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect");
    });
};

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  //if (repos.length === 0) {
  //  repoContainerEl.textContent = "No repositories found.";
    
  //  return;
 // }

  //repoSearchTerm.textContent = searchTerm;
  repoSearchTerm.textContent = repos.city.name;
  //repoContainerEl.innerHTML = repos.city.id;
  repoContainerEl.innerHTML = repos.list[0].main.temp;
  
 // console.log(repos);
  // loop over repos
 /*  for (var i = 0; i < repos.length; i++) {
    console.log(repos);
    // format repo name
    repoName = repos[i].name;
    document.getElementById("repos-container").innerHTML= repos[i].city;
    text += repos[i].city.name + "<br>";
    //window.alert(repoName);
   
    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";
 */
    // check if current repo has issues or not
   // if (repos[i].open_issues_count > 0) {
    //  statusEl.innerHTML =
    //    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
   // } else {
   //   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
     
  //  }
    
    // append to container
    //repoEl.appendChild(statusEl);

    // append container to the dom
    //repoContainerEl.appendChild(repoEl);
  }
 //repoContainerEl.innerHTML =  repoName;
//};

// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);
