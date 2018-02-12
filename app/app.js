"use strict";

angular.module("Tipster", ["ngRoute"])
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
    .when("/addtips", {
      templateUrl: "partials/addTips.html",
      controller: "AddTipsCtrl"
    })
    .when("/averages", {
      templateUrl: "partials/averages.html",
      controller: "AveragesCtrl"
    })
    .when("/totals", {
      templateUrl: "partials/totals.html",
      controller: "TotalsCtrl"
    })
    .otherwise("/", {
      templateUrl: "partials/demo.html"
    });
  });
