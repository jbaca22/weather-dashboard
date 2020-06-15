//variable for unique api key
const apikey = "e931caab6a9b47e29d705130201506&";

//global array for city name
var city = {};

//starts function on click of search button
$("#start-search").on("click", function() {
    //calls function
    getCityInfo();
})

//function that gets the city's information, and then calls other functions to display said information
var getCityInfo = function () {
    //writes user input data from text field to the city global variable
    city = $("#input").val();
    //calls api 
    var apiurl = "https://api.weatherapi.com/v1/current.json?key=" + apikey +"q=" +city;
    //allows us to use the data as JSON and retrieve what we need
    $.ajax({
        url: apiurl,
        method: "GET"
      })
      .then(function(response){
        console.log(response);
        console.log(response.current.temp_f);

        //calls functions based on response or "data" criteria
        currentWeather(response);
        forecast(response);
        //calls function to make history lidt
        historyTime();
        //stores city
        setStorage();
      })
}

//makes user history list
var historyTime = function() {
    var historyList = $("<li>").addClass("list-group-item col-5").text(city);
    $("#history").append(historyList);
}

//appends current weather data to respective html elements
var currentWeather = function (response){
    console.log(response);
    $("#city-name").append(city + ":  " + response.location.localtime);
    $("#temp").text("Temperature:  ").append(response.current.temp_f);
    $("#humidity").text("Humidity:  ").append(response.current.humidity);
    $("#wind-speed").text("Wind Speed:  ").append(response.current.wind_mph);
    $("#uv-index").text("Uv Index:  ").append(response.current.uv);
}

//pulls forecast data
var forecast = function (response){
    var forecastURL ="https://api.weatherapi.com/v1/forecast.json?key=" +apikey + "q=" + city +"&days=6";
    $.ajax({
        url: forecastURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        console.log(response.forecast.forecastday[0].day.avgtemp_f);
        //for loop scans forecast data as an array and returns the "i" value to get us information about every day in the forecast
        for (var i =0; i < response.forecast.forecastday.length; i ++) {
            var date = response.forecast.forecastday[i].date;
            var temp = response.forecast.forecastday[i].day.avgtemp_f;
            var humidity = response.forecast.forecastday[i].day.avghumidity;
            //new variables are created to better append the data to new html elemements through the loop instead of only creating one instance
            var newCard = $("<div>").addClass("card col-3");
            var newCardBody = $("<div>").addClass("card-body");
            var newDate = $("<h5>").addClass("card-header").append(date);
            var newTemp = $("<p>").addClass("card-text").text("Temperature:  ").append(temp);
            var newHumidity =$("<p>").addClass("card-text").text("Humidity:  ").append(humidity);
            var weatherIcon = $("<img>").attr("src","https://www.weatherapi.com/docs/weather_conditions.json"+ response.forecast.forecastday[i].day.condition.icon);
            //appends all new variables together
            newCardBody.append(newDate, newTemp, newHumidity, weatherIcon);
            newCard.append(newCardBody);
            $("#forecast-start").append(newCard);

        }
    })
}
//sets local storage 
var setStorage = function () {
    localStorage.setItem('city', JSON.stringify(city));
    console.log(localStorage);
}
//clears storage or "history"
$("#clear-history").on("click", function(){
    localStorage.clear();
})




