"use strict";

angular.module("Tipster").factory("TipFactory", function(FBUrl, $q, $http) {
  let tipFact = {};


  // Posts a user's tip object to firebase
  tipFact.postTip = (tipObj) => {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/tips.json`, JSON.stringify(tipObj))
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  };

  // Edits a user's tip object in firebase
  tipFact.putTip = (tipObj, fbId) => {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/tips/${fbId}.json`, JSON.stringify(tipObj))
        .then(response => {
          resolve();
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  };

  // Deletes a user's tip in firebase
  tipFact.deleteTip = (fbId) => {
    return $q((resolve, reject) => {
      $http
        .delete(`${FBUrl}/tips/${fbId}.json`)
        .then(response => {
          resolve();
        })
        .catch(error => {
          console.log('error', error);
        });
    });
  };

  // returns a promise that queries firebase for tips that match the given user id
  tipFact.getTips = ({uid}) => {  
    return $q((resolve, reject) => {
      $http
        .get(`${FBUrl}/tips.json?orderBy="uid"&equalTo=${uid}`)
        .then(({data}) => {
          let tipsArr = Object.entries(data);
          resolve(tipsArr);
        });
    });
  };


  return tipFact;
});