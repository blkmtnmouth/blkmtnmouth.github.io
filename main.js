
let key= "&units=imperial&appid=3f3b64e1caffad54fe272870e48e7591";
let base= "https://api.openweathermap.org/data/2.5/"   

// forecast?q= //
// "weather?q="
let city; 
let returnCounter = 1;



let searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function update (savedContent) {
  city=savedContent; 
  getResultsToday(city); 
  getResultsForecast(city);
}

function setQuery(evt) {
  if (evt.keyCode == 13) {
    city=searchbox.value;
    getResultsToday(city);
    getResultsForecast(city);
    mySave(city, returnCounter);
  }
}

function getResultsForecast(city) {
  let url = base + "forecast?q=" + city + key;
  fetch(url)
    .then(weatherForecast => {
      return weatherForecast.json();
    }).then(displayForecast);
}

function getResultsToday (city) {
  let url = base + "weather?q=" + city + key;
  fetch(url)
    .then(weatherToday=> {
      return weatherToday.json();
    }).then(displayToday);
}

function displayForecast(weatherForecast) {
  //console.log(weatherForecast);
  for (i=1; i<6; i++){
    var listIndex = (i*8) - 4; 
    var tempCheck = "#temp" + i; 
    var dateCheck = "#date" +i; 
    var humidityCheck = "#humidity"+i; 
    var iconCheck = "#icon"+i;
    document.querySelector(dateCheck).innerHTML = "Date: " + weatherForecast.list[listIndex].dt_txt;
    document.querySelector(tempCheck).innerHTML = "Temp: " + Math.round(weatherForecast.list[listIndex].main.temp) + "°F";
    document.querySelector(humidityCheck).innerHTML = "Humidity: " + weatherForecast.list[listIndex].main.humidity + "%";
    document.querySelector(iconCheck).src="assets/"+weatherForecast.list[listIndex].weather[0].main+".png"
  }

}
function displayToday(weatherToday) {
  //console.log(weatherToday); 
  document.querySelector("#cityToday").innerHTML = weatherToday.name; 
  document.querySelector("#dateToday").innerHTML = weatherToday.dt;
  document.querySelector("#tempToday").innerHTML = "Temp: " + weatherToday.main.temp+"°F";
  document.querySelector("#windSpeedToday").innerHTML = "Wind Speed: " + weatherToday.wind.speed+"miles/hr";
  document.querySelector("#uvIndexToday").innerHTML = "no UV INDEX Found";
  document.querySelector("#humidityToday").innerHTML = "Humdity: " + weatherToday.main.humidity+"%"; 
}

function mySave(city, returnCounter) {
  localStorage.setItem("entry" + returnCounter, city); 
  myLoad(returnCounter);
}

function myLoad(returnCounter) {
  var savedContent = localStorage.getItem("entry" + returnCounter);
  console.log(savedContent);
  historyList(savedContent, returnCounter); 
}

function historyList(savedContent, returnCounter) {
  let btn = document.createElement("BUTTON");
  btn.innerHTML = savedContent;
  btn.id = savedContent; 
  btn.addEventListener("click", console.log("hi"));
  document.querySelector("#history").appendChild(btn);
  returnCounter=returnCounter + 1;
}


/*$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});
*/



/*const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


/*function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°f / ${Math.round(weather.main.temp_max)}°f`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
} */
