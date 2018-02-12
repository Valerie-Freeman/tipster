"use strict";

angular.module("Tipster").factory("ShiftFactory", function($q, $http) { 
  let shiftObj = {};
  
  shiftObj.getShifts = ({startDate, endDate}, currentUser) => {
    return $q((resolve, reject) => {
      $http({
        method: 'GET', 
        url: `https://api.sling.is/v1/${currentUser.orgId}/calendar/${currentUser.uid}?dates=${startDate}%2F${endDate}`, 
        headers: {'Authorization': currentUser.token}
      })
      .then(({data}) => {
        let shifts = [];
        data.forEach(shift => {
          let date = new Date(shift.dtstart);
          let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          let userShift = date.toLocaleString('en-US', options).split(', ');
          let userShiftObj = {
            day: userShift[0],
            date: userShift[1],
            year: userShift[2],
            time: userShift[3]
          };
          shifts.push(userShiftObj);
        });
        resolve(shifts);
      })
      .catch((error) => {
        console.log('error', error);
      });
    });
  };

  return shiftObj;
});