"use strict";

angular.module("Tipster").controller("ShiftsCtrl", function($scope, AuthFactory, ShiftFactory, TipFactory) {

  //Grabs dates entered by user and makes a call to Sling to get the user's shifts durring the given time. 
  $scope.listShifts = () => {
    console.log('called');
    if($scope.startDate === undefined) {
      alert("Please enter a start date");
    } if($scope.endDate === undefined) {
      alert("Please enter an end date");
    } else {
      let dates = {
        startDate: ($scope.startDate).toISOString(),
        endDate: ($scope.endDate).toISOString()
      };
      // Gets user's shifts from Sling
      ShiftFactory.getShifts(dates, AuthFactory.getCurrentUser())
      .then(shiftsArr => {    
        $scope.shifts = shiftsArr;
        // Gets user's recorded tips from Firebase
        return TipFactory.getTips(AuthFactory.getCurrentUser());
      })
      .then(tips => {
        //Compares $scope.Shifts (the user's shifts from Sling) to the user's tips from firebase. If both have same shiftId from Sling, the tip amount is added to $scope.shifts
        $scope.shifts.forEach(shift => {
          tips.forEach(tip => {
            if(shift.shiftId === tip[1].shiftId) {
              shift.tip = `$${tip[1].amount}.00`;
              shift.amount = tip[1].amount;
              shift.fbId = tip[0];
            }
          });
        });
      })
      .catch(err => {
        console.log('error', err);
      });
    }
  };

  // Displays "clicked shift" information in modal after clicking the "Add tip amount" or "Edit tip amount button"
  $scope.populateModal = (clickedShift) => {
    $scope.shift = clickedShift;  
  };
  
  // Grabs shift information and tip amount entered by user and writes a tip object to send to Firebase. Calls TipFactory.postTip to post the tip object to Firebase
  $scope.saveTip = () => {
    if($scope.shift.amount === undefined || +$scope.shift.amount % 1 !== 0 || +$scope.shift.amount === 0) {
      alert("Please enter a valid tip amount rounded to the nearest dollar");
    } else {
      let tipObj = {
        uid: AuthFactory.getCurrentUser().uid,
        month: $scope.shift.date.split(" ")[0],
        year: $scope.shift.year,
        day: $scope.shift.day,
        time: $scope.shift.time.split(" ")[1],
        amount: +$scope.shift.amount,
        shiftId: $scope.shift.shiftId
      };
      TipFactory.postTip(tipObj)
      .then( () => {
        $scope.listShifts();
      });
    }
  };

  // Grabs shift information and tip amount entered by user and writes a tip object to send to Firebase. Calls TipFactory.putTip to update the existing tip object in Firebase
  $scope.editTip = () => {
    if($scope.shift.amount === undefined || +$scope.shift.amount % 1 !== 0 || +$scope.shift.amount === 0) {
      alert("Please enter a valid tip amount rounded to the nearest dollar");
    } else {
      let tipObj = {
        uid: AuthFactory.getCurrentUser().uid,
        month: $scope.shift.date.split(" ")[0],
        year: $scope.shift.year,
        day: $scope.shift.day,
        time: $scope.shift.time.split(" ")[1],
        amount: +$scope.shift.amount,
        shiftId: $scope.shift.shiftId
      };
      TipFactory.putTip(tipObj, $scope.shift.fbId)
      .then( () => {
        $scope.listShifts();
      });
    }
  };

  //Calls TipFactory to delete a tip from firebase using the tip's firebase id
  $scope.deleteTip = () => {
    TipFactory.deleteTip($scope.shift.fbId)
    .then( () => {
      console.log('hello');
      $scope.listShifts();
    });
  };
});