"use strict";

angular.module("Tipster", ["ngRoute", "chart.js"])
  .constant("FBUrl", "https://tipsterdata.firebaseio.com/")
  .config(($routeProvider) => {
    $routeProvider
    .when("/", {
      templateUrl: "partials/demo.html",
    })
    .when("/dashboard", {
      templateUrl: "partials/dashboard.html",
      controller: "DashboardCtrl"
    })
    .when("/shifts", {
      templateUrl: "partials/shifts.html",
      controller: "ShiftsCtrl"
    })
    .when("/stats", {
      templateUrl: "partials/stats.html",
      controller: "StatsCtrl"
    })
    .otherwise("/", {
      templateUrl: "partials/demo.html"
    });
  });
