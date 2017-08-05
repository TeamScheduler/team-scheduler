/*jshint strict:false */

angular.module("MyApp").controller("UserScheduleController", function($scope) {
  //Columns
  $scope.days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

  //Lines
  $scope.hours = [
    {
      hour: "5:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "6:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "6:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "7:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "7:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "8:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "8:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "9:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "9:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "10:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "10:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "11:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "11:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "12:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "12:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "13:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "13:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "14:00",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    },
    {
      hour: "14:30",
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    }
  ];

  $scope.isEditMode = false;

  $scope.addHour = function(hour, dayFlag) {
    if ($scope.isEditMode) {
      temp = $scope.hours[getIndex(hour)];

      if (dayFlag === "mon") temp.mon.push("USERNAME!");

      if (dayFlag === "tue") temp.tue.push("USERNAME!");

      if (dayFlag === "wed") temp.wed.push("USERNAME!");

      if (dayFlag === "thu") temp.thu.push("USERNAME!");

      if (dayFlag === "fri") temp.fri.push("USERNAME!");

      if (dayFlag === "sat") temp.sat.push("USERNAME!");

      if (dayFlag === "sun") temp.sun.push("USERNAME!");
    }
  };

  function getIndex(hour) {
    return $scope.hours.indexOf(hour);
  }

  $scope.removeHour = function(hour, dayFlag, user) {
    if ($scope.isEditMode) {
      temp = $scope.hours[getIndex(hour)];
      var index;
      if (dayFlag === "mon") {
        index = temp.mon.indexOf(user);
        temp.mon.splice(index, 1);
      }

      if (dayFlag === "tue") {
        index = temp.tue.indexOf(user);
        temp.tue.splice(index, 1);
      }

      if (dayFlag === "wed") {
        index = temp.wed.indexOf(user);
        temp.wed.splice(index, 1);
      }

      if (dayFlag === "thu") {
        index = temp.thu.indexOf(user);
        temp.thu.splice(index, 1);
      }

      if (dayFlag === "fri") {
        index = temp.fri.indexOf(user);
        temp.fri.splice(index, 1);
      }

      if (dayFlag === "sat") {
        index = temp.sat.indexOf(user);
        temp.sat.splice(index, 1);
      }

      if (dayFlag === "sun") {
        index = temp.sun.indexOf(user);
        temp.sun.splice(index, 1);
      }
    }
  };
});
