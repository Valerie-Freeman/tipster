"use strict";

angular.module("Tipster").factory("AuthFactory", function($q, $http) {
  let authObj = {};
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || null;

  authObj.login = (account) => {
    return $q( (resolve, reject) => {
      $http
        .post('https://api.sling.is/v1/account/login', JSON.stringify(account))
        .then((response) => {       
          currentUser = {
            uid: response.data.user.id,
            orgId: response.data.user.orgs[0].id,
            firstname: response.data.user.name,
            lastname: response.data.user.lastname,
            token: response.headers().authorization
          };    
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));      
          resolve(currentUser);
        })
        .catch(error => {
          console.log("error", error);
          reject(error);
        });
    });
  };

  authObj.getCurrentUser = () => currentUser;

  authObj.logout = () => {
    currentUser = null;
    sessionStorage.removeItem("currentUser");
  };
  
  return authObj;
});