"use strict";

angular.module("Tipster").factory("StatFactory", function() {
  let statFact = {};

  statFact.getAverages = (userTips) => {
    let averages = {
      sunAM: 0,
      sunPM: 0,
      monAM: 0,
      monPM: 0,
      tuesAM: 0,
      tuesPM: 0,
      wedAM: 0,
      wedPM: 0,
      thurAM: 0,
      thurPM: 0,
      friAM: 0,
      friPM: 0,
      satAM: 0,
      satPM: 0,
    };
    let dividends = {
      sunAM: 0,
      sunPM: 0,
      monAM: 0,
      monPM: 0,
      tuesAM: 0,
      tuesPM: 0,
      wedAM: 0,
      wedPM: 0,
      thurAM: 0,
      thurPM: 0,
      friAM: 0,
      friPM: 0,
      satAM: 0,
      satPM: 0,
    };
    let divisors = {
      sunAM: 0,
      sunPM: 0,
      monAM: 0,
      monPM: 0,
      tuesAM: 0,
      tuesPM: 0,
      wedAM: 0,
      wedPM: 0,
      thurAM: 0,
      thurPM: 0,
      friAM: 0,
      friPM: 0,
      satAM: 0,
      satPM: 0,
    };

    let tips = [];
      userTips.forEach(tip => {
        tips.push(tip[1]);
      });

      tips.forEach(tip => {
        if(tip.day === "Sunday" && tip.time === "AM") {
          divisors.sunAM++;
          dividends.sunAM += tip.amount;
          averages.sunAM = Math.round(dividends.sunAM / divisors.sunAM);
        }
        if(tip.day === "Sunday" && tip.time === "PM") {
          divisors.sunPM++;
          dividends.sunPM += tip.amount;
          averages.sunPM = Math.round(dividends.sunPM / divisors.sunPM);
        }
        if(tip.day === "Monday" && tip.time === "AM") {
          divisors.monAM++;
          dividends.monAM += tip.amount;
          averages.monAM = Math.round(dividends.monAM / divisors.monAM);
        }
        if(tip.day === "Monday" && tip.time === "PM") {
          divisors.monPM++;
          dividends.monPM += tip.amount;
          averages.monPM = Math.round(dividends.monPM / divisors.monPM);
        }
        if(tip.day === "Tuesday" && tip.time === "AM") {
          divisors.tuesAM++;
          dividends.tuesAM += tip.amount;
          averages.tuesAM = Math.round(dividends.tuesAM / divisors.tuesAM);
        }
        if(tip.day === "Tuesday" && tip.time === "PM") {
          divisors.tuesPM++;
          dividends.tuesPM += tip.amount;
          averages.tuesPM = Math.round(dividends.tuesPM / divisors.tuesPM);
        }
        if(tip.day === "Wednesday" && tip.time === "AM") {
          divisors.wedAM++;
          dividends.wedAM += tip.amount;
          averages.wedAM = Math.round(dividends.wedAM / divisors.wedAM);
        }
        if(tip.day === "Wednesday" && tip.time === "PM") {
          divisors.wedPM++;
          dividends.wedPM += tip.amount;
          averages.wedPM = Math.round(dividends.wedPM / divisors.wedPM);
        }
        if(tip.day === "Thursday" && tip.time === "AM") {
          divisors.thurAM++;
          dividends.thurAM += tip.amount;
          averages.thurAM = Math.round(dividends.thurAM / divisors.thurAM);
        }
        if(tip.day === "Thursday" && tip.time === "PM") {
          divisors.thurPM++;
          dividends.thurPM += tip.amount;
          averages.thurPM = Math.round(dividends.thurPM / divisors.thurPM);
        }
        if(tip.day === "Friday" && tip.time === "AM") {
          divisors.friAM++;
          dividends.friAM += tip.amount;
          averages.friAM = Math.round(dividends.friAM / divisors.friAM);
        }
        if(tip.day === "Friday" && tip.time === "PM") {
          divisors.friPM++;
          dividends.friPM += tip.amount;
          averages.friPM = Math.round(dividends.friPM / divisors.friPM);
        }
        if(tip.day === "Saturday" && tip.time === "AM") {
          divisors.satAM++;
          dividends.satAM += tip.amount;
          averages.satAM = Math.round(dividends.satAM / divisors.satAM);
        }
        if(tip.day === "Saturday" && tip.time === "PM") {
          divisors.satPM++;
          dividends.satPM += tip.amount;
          averages.satPM = Math.round(dividends.satPM / divisors.satPM);
        }
      });

    return averages;
  };

  statFact.getYearOverview = (userTips, year) => { 
    let yearOverview = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sept: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
      year: 0
    };

    let yearsTips = [];
    userTips.forEach(tip => {
      if(tip[1].year === year) {
        yearsTips.push(tip[1]);
      }
    });

    yearsTips.forEach(tip => {
      yearOverview.year += tip.amount;
      if (tip.month === "January") {
        yearOverview.Jan += tip.amount;
      } 
      else if (tip.month === "February") {
        yearOverview.Feb += tip.amount;
      } 
      else if (tip.month === "March") {
        yearOverview.Mar += tip.amount;
      } 
      else if (tip.month === "April") {
        yearOverview.Apr += tip.amount;
      } 
      else if (tip.month === "May") {
        yearOverview.May += tip.amount;
      } 
      else if (tip.month === "June") {
        yearOverview.Jun += tip.amount;
      } 
      else if (tip.month === "July") {
        yearOverview.Jul += tip.amount;
      } 
      else if (tip.month === "August") {
        yearOverview.Aug += tip.amount;
      } 
      else if (tip.month === "September") {
        yearOverview.Sept += tip.amount;
      } 
      else if (tip.month === "October") {
        yearOverview.Oct += tip.amount;
      } 
      else if (tip.month === "November") {
        yearOverview.Nov += tip.amount;
      } 
      else if (tip.month === "December") {
        yearOverview.Dec += tip.amount;
      }
    });

    return yearOverview;
  };

  return statFact;
});