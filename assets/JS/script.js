const apikey = "e931caab6a9b47e29d705130201506&"; 
var city = {};

$("#start-search").on("click", function() {
    getCityInfo();
})

var getCityInfo = function () {
    city = $("#input").val();

    var apiurl = "https://api.weatherapi.com/v1/current.json?key=" + apikey +"q=" +city;

    $.ajax({
        url: apiurl,
        method: "GET"
      })
      .then(function(response){
        console.log(response);
        console.log(response.current.temp_f);

        currentWeather(response);
        forecast(response);
        historyTime();

        setStorage();
      })
}

var historyTime = function() {
    var historyList = $("<li>").addClass("list-group-item col-5").text(city);
    $("#history").append(historyList);
}

var currentWeather = function (response){
    console.log(response);
    $("#city-name").append(city + ":  " + response.location.localtime);
    $("#temp").text("Temperature:  ").append(response.current.temp_f);
    $("#humidity").text("Humidity:  ").append(response.current.humidity);
    $("#wind-speed").text("Wind Speed:  ").append(response.current.wind_mph);
    $("#uv-index").text("Uv Index:  ").append(response.current.uv);
}

var forecast = function (response){
    var forecastURL ="https://api.weatherapi.com/v1/forecast.json?key=" +apikey + "q=" + city +"&days=6";
    $.ajax({
        url: forecastURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        console.log(response.forecast.forecastday[0].day.avgtemp_f);

        for (var i =0; i < response.forecast.forecastday.length; i ++) {
            var date = response.forecast.forecastday[i].date;
            var temp = response.forecast.forecastday[i].day.avgtemp_f;
            var humidity = response.forecast.forecastday[i].day.avghumidity;

            var newCard = $("<div>").addClass("card col-3");
            var newCardBody = $("<div>").addClass("card-body");
            var newDate = $("<h5>").addClass("card-header").append(date);
            var newTemp = $("<p>").addClass("card-text").text("Temperature:  ").append(temp);
            var newHumidity =$("<p>").addClass("card-text").text("Humidity:  ").append(humidity);
            var weatherIcon = $("<img>").attr("src","https://www.weatherapi.com/docs/weather_conditions.json"+ response.forecast.forecastday[i].day.condition.icon);

            newCardBody.append(newDate, newTemp, newHumidity, weatherIcon);
            newCard.append(newCardBody);
            $("#forecast-start").append(newCard);

        }
    })
}

var setStorage = function () {
    localStorage.setItem('city', JSON.stringify(city));
    console.log(localStorage);
}

$("#clear-history").on("click", function(){
    localStorage.clear();
})




