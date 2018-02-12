"use strict";

angular.module("Tipster").controller("AddTipsCtrl", function($scope, AuthFactory, ShiftFactory) {
  $scope.message = "This is the Add Tips page!";

  console.log("current user", AuthFactory.getCurrentUser());
  $scope.listShifts = () => {
    if($scope.startDate === undefined) {
      alert("Please enter a start date");
    } if($scope.endDate === undefined) {
      alert("Please enter an end date");
    } else {
      let dates = {
        startDate: ($scope.startDate).toISOString(),
        endDate: ($scope.endDate).toISOString()
      };
      ShiftFactory.getShifts(dates, AuthFactory.getCurrentUser())
      .then(shiftsArr => {
        $scope.shifts = shiftsArr;
        console.log('scope.shifts', $scope.shifts);
        
      })
      .catch(err => {
        console.log('error', err);
      });
    }
  };

  $scope.populateModal = (clickedShift) => {
    $scope.shift = clickedShift;    
    console.log('clicked shift', $scope.shift);
  };
  
  $scope.saveTip = () => {
    if($scope.shift.amount === undefined || +$scope.shift.amount % 1 !== 0 || +$scope.shift.amount === 0) {
      alert("Please enter a valid tip amount rounded to the nearest dollar");
    } else {
      let tip = {
        uid: AuthFactory.getCurrentUser().uid,
        date: $scope.shift.date,
        year: $scope.shift.year,
        day: $scope.shift.day,
        time: $scope.shift.time,
        amount: +$scope.shift.amount
      };
      console.log('tip', tip);
    }
  };
});