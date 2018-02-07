"use strict";

angular.module("Tipster", ["ngRoute"])
  .constant("FBUrl", "https://tipsterdata.firebaseio.com/")
  .config(($routeProvider) => {
    $routeProvider
    .when("/", {
      templateUrl: "partials/demo.html",
    })
    .otherwise("/", {
      templateUrl: "partials/demo.html"
    });
  });
