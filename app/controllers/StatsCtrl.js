"use strict";

angular.module("Tipster").controller("StatsCtrl", function($scope, AuthFactory, TipFactory, StatFactory) {
  $scope.message = "This is the Stats page, veiw totals and averages on this page";

  $scope.getAverages = () => {
    $scope.averagesTab = "active";
    $scope.overviewTab = "";
    
    TipFactory.getTips(AuthFactory.getCurrentUser())
    .then(userTips => {
      let averages = StatFactory.getAverages(userTips);
      console.log('averages', averages);

      $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      $scope.series = ['AM', 'PM'];

      $scope.data = [
        [averages.monAM, averages.tuesAM, averages.wedAM, averages.thurAM, averages.friAM, averages.satAM, averages.sunAM],
        [averages.monPM, averages.tuesPM, averages.wedPM, averages.thurPM, averages.friPM, averages.satPM, averages.sunPM],
      ];

      
    });

  };

  $scope.getAverages();
  
  //Populates "Year overview" dropdown with years depending o the users tips in Firebase
  TipFactory.getTips(AuthFactory.getCurrentUser())
  .then(userTips => {
    let years = [];
    userTips.forEach(tip => {
      years.push(tip[1].year);
    });
    $scope.years = _.uniq(years);
  });

  //Creates an array of the users tips durring one given year
  //Calculates the monthly tip totals durring given year
  //Calculates the given year's tip total
  $scope.getYearOverview = (year) => {
    $scope.averagesTab = "";
    $scope.overviewTab = "active";
  
    console.log('chosen year', year);
    TipFactory.getTips(AuthFactory.getCurrentUser())
    .then(userTips => {
      let yearOverview = StatFactory.getYearOverview(userTips, year);
      console.log('year overview', yearOverview);
      
      $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      $scope.data = [
        [yearOverview.Jan, yearOverview.Feb, yearOverview.Mar, yearOverview.Apr, yearOverview.May, yearOverview.Jun, yearOverview.Jul, yearOverview.Aug, yearOverview.Sept, yearOverview.Oct, yearOverview.Nov, yearOverview.Dec],
      ];
    });
  };

  $scope.options = {
    title: {
        display: true,
        text: 'Calorie Intake vs. Calorie Goal',
        fontColor: 'blue',
        fontSize: 16,
        fontFamily: 'Open Sans Condensed'
      },
    scales: {
        yAxes:  [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                min: 1200,
                fontColor: 'blue',
                fontFamily: 'Open Sans Condensed'
            }
          },  
        ],
        xAxes:  [
          {
            ticks: {
              fontColor: 'white',
              fontFamily: 'Open Sans Condensed'
            }
          }
        ]
    }
};

});