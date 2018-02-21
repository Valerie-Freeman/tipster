"use strict";

angular.module("Tipster").factory("ShiftFactory", function($q, $http) { 
  let shiftFact = {};
  
  // Gets the user's shifts between two given dates
  shiftFact.getShifts = ({startDate, endDate}, currentUser) => {
    return $q((resolve, reject) => {
      $http({
        method: 'GET', 
        url: `https://api.sling.is/v1/${currentUser.orgId}/calendar/${currentUser.uid}?dates=${startDate}%2F${endDate}`, 
        headers: {'Authorization': currentUser.token}
      })
      .then(({data}) => {
        // Sorts the data by time
        data.sort(function(a, b) {
          return (a.dtstart < b.dtstart) ? -1 : ((a.dtstart > b.dtstart) ? 1 : 0);
        });      
        let shifts = [];
        data.forEach(shift => {  
          if(shift.user.id === currentUser.uid) {
            let date = new Date(shift.dtstart);
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let shiftDate = date.toLocaleString('en-US', options).split(', ');
            let userShiftObj = {
              day: shiftDate[0],
              date: shiftDate[1],
              year: shiftDate[2],
              time: shiftDate[3],
              shiftId: shift.id
            };
            shifts.push(userShiftObj);
          }
        });        
        resolve(shifts);
      })
      .catch((error) => {
        console.log('error', error);
      });
    });
  };

// Gets user's the next occurring shift 
shiftFact.getNextShift = (currentUser) => {
  return $q((resolve, reject) => {
    $http({
      method: 'GET', 
      url: `https://api.sling.is/v1/shifts/current`, 
      headers: {'Authorization': currentUser.token}
    })
    .then(({data}) => {      
      let date = new Date(data[0].dtstart);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      let shiftDate = date.toLocaleString('en-US', options).split(', ');
      let nextShiftObj = {
        day: shiftDate[0],
        date: shiftDate[1],
        year: shiftDate[2],
        time: shiftDate[3],
        shiftId: data[0].id
      };       
      resolve(nextShiftObj);
    })
    .catch((error) => {
      console.log('error', error);
    });
  });
};

  return shiftFact;
});