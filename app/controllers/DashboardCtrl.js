"use strict";

angular.module("Tipster").controller("DashboardCtrl", function($scope, AuthFactory, ShiftFactory, TipFactory, StatFactory, GoalFactory) {
  $scope.currentUser = AuthFactory.getCurrentUser();
  
  // Requires ShiftFactory to call to Sling and get the users upcoming shift
  ShiftFactory.getNextShift(AuthFactory.getCurrentUser())
  .then(nextShift => {
    $scope.nextShift = nextShift;
  })
  .catch(error => {
    console.log('error', error);
  });

  // Gets the user's monthly goal from firebase
  // Displays in progress bar
  $scope.displayGoal = () => {
    GoalFactory.getGoal(AuthFactory.getCurrentUser())
    .then(goalArr => {
      $scope.goal = {
        amount: goalArr[0][1].amount,
        fbId: goalArr[0][0]
      };
      return TipFactory.getTips(AuthFactory.getCurrentUser());
    })
    .then(userTips => {
      let options = {year: 'numeric'};
      let currentYear = new Date().toLocaleDateString('en-US', options);
      return StatFactory.getYearOverview(userTips, currentYear);
    })
    .then(yearOverview => {
      let options = {month: 'short'};
      let currentMonth = new Date().toLocaleDateString('en-US', options);
      $scope.monthEarnings = yearOverview[currentMonth];
      let percent = ($scope.monthEarnings / $scope.goal.amount) * 100;
      $scope.percent = `${percent}%`;
      $('#month-goal').css("width", $scope.percent);
    })
    .catch(error => {
      console.log('error', error);
    });
  };

  // Call displayGoal on page load to get user's goal progress
  $scope.displayGoal();

  // Get the best shift on average
  TipFactory.getTips(AuthFactory.getCurrentUser())
  .then(userTips => {
    let averages = StatFactory.getAverages(userTips);
    let shiftKeys = Object.keys(averages);
    $scope.bestShift = {
      shiftTime: "You need to add some tips!",
      shiftAmount: 0
    };
    shiftKeys.forEach(shift => {
      if(averages[shift] > $scope.bestShift.shiftAmount) {
        $scope.bestShift.shiftTime = shift;
        $scope.bestShift.shiftAmount = averages[shift];
      }
    });
  });

  $scope.setGoal = () => {
    if($scope.goal.amount === undefined || +$scope.goal.amount % 1 !== 0 || +$scope.goal.amount === 0) {
      alert("Please enter a valid goal amount rounded to the nearest dollar");
    } else {
      let goalObj = {
        uid: AuthFactory.getCurrentUser().uid,
        amount: $scope.goal.amount
      };
      GoalFactory.postGoal(goalObj)
      .then( (response) => {
        $scope.displayGoal();
      });
    }
  };

  $scope.editGoal = () => {
    if($scope.goal.amount === undefined || +$scope.goal.amount % 1 !== 0 || +$scope.goal.amount === 0) {
      alert("Please enter a valid goal amount rounded to the nearest dollar");
    } else {
      let goalObj = {
        uid: AuthFactory.getCurrentUser().uid,
        amount: $scope.goal.amount
      };
      GoalFactory.putGoal(goalObj, $scope.goal.fbId) //second parameter is goalObj fbId
      .then( () => {
        $scope.displayGoal();
      });
    }
  };
});