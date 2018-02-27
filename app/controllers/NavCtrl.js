"use strict";

angular.module("Tipster").controller("NavCtrl", function($scope, AuthFactory, $location) {
  
  $scope.account = {
    email: "",
    password: "",
    snsPlatform: null,
    snsToken: null
  };
  
  let checkIfUser = () => {
    if (AuthFactory.getCurrentUser() !== null) {
      $scope.user = true;
      $scope.currentUser = AuthFactory.getCurrentUser();
    } else {
      $scope.user = false;
    }
  };
  
  checkIfUser();
  
  
  $scope.login = () => {
    AuthFactory.login($scope.account)
    .then( () => {
      checkIfUser();
      $location.url("/dashboard");
    })
    .catch(error => {
      console.log('error', error);
    });
  };
  
  $scope.logoutUser = () => {
    AuthFactory.logout();
    checkIfUser();
  };

});