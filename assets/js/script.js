$(document).ready(function() {
    // global variables
    var searchBtn = $(".searchBtn");
    var deleteBtn = $(".deleteBtn");
    var userInput = $("#user-input");
    var historyList = $(".history-list");
    var currentWeatherDiv = $("#current-weather");
    var currentWeather = $("#current");
    var forecastDiv = $("#forecast");
    var fiveDayForecast = $("#five-day-forecast");
    // starting local storage
    var searchHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];

    function getGeoLocation () {
        var city = userInput.val().trim();
        var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
        var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response) {
            var lat = response[0].lat;
            var lon = response[0].lon;
            var name = response[0].name;
            console.log("LAT & LON: " + lat, lon);
            console.log("Geolocation: ", response);

            
            getCurrentWeather(lat, lon, name);
            // makeHistoryList(name);
            currentWeather.empty();
            fiveDayForecast.empty();


        });
    }

    function getCurrentWeather(lat, lon, name) {
        var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
        var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            if (searchHistory.indexOf(name) === -1) {
                searchHistory.push(name);
                window.localStorage.setItem("history", JSON.stringify(searchHistory));
                makeHistoryList(name);
            }
            console.log("Current weather: ", response);
            var weatherCard = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cityName = $("<h3>").addClass("card-title").text(name);
            var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png");
            var temp = $("<p>").addClass("card-text").text("Current Temperature (F): " + Math.floor(response.current.temp));
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + Math.floor(response.current.humidity));
            var windspeed = $("<p>").addClass("card-text").text("Wind speed (mph): " + Math.floor(response.current.wind_speed));
            var uvI = $("<p>").addClass("card-text").text("UV Index: " + response.current.uvi);
            cityName.append(weatherIcon);
            cardBody.append(cityName, temp, humidity, windspeed, uvI);
            weatherCard.append(cardBody);
            currentWeather.append(weatherCard);

            for (var i = 1; i < 6; i++) {
                var weatherCard = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cityName = $("<h3>").addClass("card-title").text(name);
                var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png");
                var temp = $("<p>").addClass("card-text").text("Current Temperature (F): " + Math.floor(response.daily[i].temp.day));
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + Math.floor(response.daily[i].humidity));
                var windspeed = $("<p>").addClass("card-text").text("Wind speed (mph): " + Math.floor(response.daily[i].wind_speed));
                
                cityName.append(weatherIcon);
                cardBody.append(cityName, temp, humidity, windspeed);
                weatherCard.append(cardBody);
                fiveDayForecast.append(weatherCard);
            }
        });
        console.log("Search button clicked!!!");
    }

    function makeHistoryList(city) {
        // var cityName = userInput.val().trim();
        var historyButton = $("<button>").addClass("btn btn-primary history");
        historyButton.addClass("btn").text(city);
        historyList.append(historyButton);
    }

    searchBtn.on("click", getGeoLocation);

    // history
    if (searchHistory.length > 0) {
        getCurrentWeather(searchHistory[searchHistory.length - 1]);
    }

    for (var i = 0; i < searchHistory.length; i++) {
        makeHistoryList(searchHistory[i]);
    }

    deleteBtn.on("click", function(event) {
        event.preventDefault();
        cityList = [];
        localStorage.removeItem("history");
        document.location.reload();
    });

    $(".history").on("click", function() {
        getCurrentWeather($(this).city);
    });
});

