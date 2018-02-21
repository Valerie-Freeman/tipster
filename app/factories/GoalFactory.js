"use strict";

angular.module("Tipster").factory("GoalFactory", function(FBUrl, $q, $http) {
  let goalFact = {};

  goalFact.postGoal = (goalObj) => {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/goals.json`, JSON.stringify(goalObj))
        .then(response => {
          console.log('sent', response);
          resolve(response);
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  };

  goalFact.putGoal = (goalObj, fbId) => {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/goals/${fbId}.json`, JSON.stringify(goalObj))
        .then(response => {
          console.log('sent', response);
          resolve();
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  };

  goalFact.getGoal = ({uid}) => {  
    return $q((resolve, reject) => {
      $http
        .get(`${FBUrl}/goals.json?orderBy="uid"&equalTo=${uid}`)
        .then(({data}) => {
          let goalArr = Object.entries(data);
          console.log('GoalFactory goalArr', goalArr);
          resolve(goalArr);
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  };

  return goalFact;
});
