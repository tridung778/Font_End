myApp.controller("gioHangCtrl", function ($scope, $rootScope) {
  $scope.Tours = [
    {
      img: "DaNang.jpg",
      tourName: "Tour Da Nang",
      giaTien: 800000,
      soCho: 5,
    },
    {
      img: "DaNang.jpg",
      tourName: "Tour Da Nang",
      giaTien: 800000,
      soCho: 5,
    },
    {
      img: "DaNang.jpg",
      tourName: "Tour Da Nang",
      giaTien: 800000,
      soCho: 5,
    },
    {
      img: "DaNang.jpg",
      tourName: "Tour Da Nang",
      giaTien: 800000,
      soCho: 5,
    },
    {
      img: "DaNang.jpg",
      tourName: "Tour Da Nang",
      giaTien: 800000,
      soCho: 5,
    },
  ];

  $scope.tinhTienTour = function () {
    let tongTienTours = 0;
    angular.forEach($scope.Tours, function (tour) {
      tour.tongTienTour = parseFloat(tour.giaTien) * parseFloat(tour.soCho);
      tongTienTours += tour.tongTienTour;
    });
    $scope.tongTienTours = tongTienTours;
  };
});
