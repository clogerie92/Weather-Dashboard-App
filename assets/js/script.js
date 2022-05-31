$(document).ready(function() {
    // global variables
    var searchBtn = $(".searchBtn");
    var deleteBtn = $(".deleteBtn");
    var userInput = $("#user-input");
    var historyList = $(".history-list");
    var currentWeatherDiv = $("#current-weather");
    var forecastDiv = $("#forecast");
    // starting local storage
    var searchHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];

    function getCurrentWeather(userInput) {
        var apiKey = "b0786aaf2595b4e2380f01ed8f03a7a4";
        var queryUrl = "https://api.openweathermap.org/data/3.0/onecall?=" + userInput + "lat={lat}&lon={lon}&exclude={part}&appid=" + apiKey + "&units=imperical";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });
        console.log("Search button clicked!!!");
    }

    searchBtn.on("click", getCurrentWeather);




});