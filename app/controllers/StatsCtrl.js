"use strict";

angular.module("Tipster").controller("StatsCtrl", function($scope, AuthFactory, TipFactory, StatFactory) {
  $scope.message = "This is the Stats page, veiw totals and averages on this page";

  $scope.getAverages = () => {
    $scope.showYear = false;
    $scope.averagesTab = "active";
    $scope.overviewTab = "";
    
    TipFactory.getTips(AuthFactory.getCurrentUser())
    .then(userTips => {
      let averages = StatFactory.getAverages(userTips);

      $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      $scope.series = ['AM', 'PM'];

      $scope.data = [
        [averages.monAM, averages.tuesAM, averages.wedAM, averages.thurAM, averages.friAM, averages.satAM, averages.sunAM],
        [averages.monPM, averages.tuesPM, averages.wedPM, averages.thurPM, averages.friPM, averages.satPM, averages.sunPM],
      ];

      $scope.colors = ['#f7ce3e', '#1a2930'];

      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];

      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  min: 50,
                  fontColor: 'black',
                  fontFamily: ''
              }
            },
          ],
          xAxes: [{
            ticks: {
              fontColor: 'black',
              fontFamily: ""
            }
          }]
        }
      };
      
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
    $scope.showYear = true;
    $scope.averagesTab = "";
    $scope.overviewTab = "active";
  
    TipFactory.getTips(AuthFactory.getCurrentUser())
    .then(userTips => {
      let yearOverview = StatFactory.getYearOverview(userTips, year);

      $scope.yearTotal = yearOverview.year;
      
      $scope.series = [];

      $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      $scope.data = [
        [yearOverview.Jan, yearOverview.Feb, yearOverview.Mar, yearOverview.Apr, yearOverview.May, yearOverview.Jun, yearOverview.Jul, yearOverview.Aug, yearOverview.Sept, yearOverview.Oct, yearOverview.Nov, yearOverview.Dec],
      ];

      $scope.colors = ['#1a2930'];

      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];

      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  min: 0,
                  fontColor: 'black',
                  fontFamily: 'Helvetica'
              }
            },
          ],
          xAxes: [{
            ticks: {
              fontColor: 'black',
              fontFamily: "Helvetica"
            }
          }]
        }
      };

    });
  };
  
  // set colors of bar graph
  // $scope.colors = [{ 
  //         borderColor:  'rgba(225, 128, 81, 0.7)',
  //         backgroundColor:'rgb(201, 81, 53)',
  //         borderWidth: 5
  //     }];
  // $scope.chartOptions = 

  // options for labels on x an y axes 
  // $scope.labelOptions = {
          
  //         scales: { 
  //             yAxes: [{
  //                 ticks: {
  //                     fontColor: "white",
  //                     fontSize : 20,
  //                     stepSize: 1,
  //                     beginAtZero: true
  //                 },                            
  //                 gridLines:{
  //                 display:false,
  //                 }
  //             }],
  //             xAxes : [{
  //                 stacked: true,
  //                 barThickness: 75,
  //                 gridLines:{
  //                             display:false,
  //                         },
  //                 ticks: {
  //                     fontColor: 'white',
  //                     fontSize: 20,
  //                     fontFamily: 'Futura'
  //                 }
  //             }]
  //         }
  //     };

});