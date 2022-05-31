$(document).ready(function() {
    var searchHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];
    var searchBtn = $(".searchBtn");
    var deleteBtn = $(".deleteBtn");
    var userInput = $("#user-input");
    var historyList = $(".history-list");
    var currentWeatherDiv = $("#current-weather");
    var forecastDiv = $("#forecast");
});