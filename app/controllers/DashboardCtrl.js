"use strict";

angular.module("Tipster").controller("DashboardCtrl", function($scope, AuthFactory) {
  $scope.currentUser = AuthFactory.getCurrentUser();
});