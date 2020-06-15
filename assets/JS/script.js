const apikey = "e931caab6a9b47e29d705130201506&"; 
var city = {};

$("#start-search").on("click", function() {
    city = $("#input").val();
    console.log(city);
    $("#city-name").append(location.name);
    getCityInfo();
})

fetch("https://api.weatherapi.com/v1/current.json?key=e931caab6a9b47e29d705130201506&q=city").then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});



var getCityInfo = function () {
    var date = {};
    var temp = {};
    var humidity = {};
    var windspeed = {};
    var UV = {};
    var store = {};

    var apiurl = "https://api.weatherapi.com/v1/current.json?key=" + apikey +"q=" +city;
        fetch(apiurl).then(function(response) {
            response.json().then(function(data) {
            console.log(data,);
        });
    });

    setStorage();
}


var setStorage = function () {
    localStorage.setItem('city', JSON.stringify(city));
    console.log(localStorage);
}

$("#clear-history").on("click", function(){
    localStorage.clear();
})




