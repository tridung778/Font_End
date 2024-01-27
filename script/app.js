var myApp = angular.module("myApp", ["ngRoute"]);

myApp.controller(
  "homeCtrl",
  function ($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];
    $rootScope.tours = [];
    $rootScope.tour = {};
    $rootScope.test = 0;
    $rootScope.groupedToursArray = []; // Khai báo groupedToursArray ở đây
    $rootScope.quantity = 0;

    $rootScope.tinhTongTienTours = function () {
      let tongTienTours = 0;
      angular.forEach($rootScope.groupedToursArray, function (tour) {
        tongTienTours += tour.price * tour.quantity;
      });
      $rootScope.tongTienTours = tongTienTours;
    };

    $rootScope.xoaTour = function (tour) {
      console.log("Xóa tour với id:", tour.id);
      var index = $rootScope.groupedToursArray.findIndex(
        (t) => t.id === tour.id
      );
      console.log("Index của tour cần xóa:", index);
      if (index !== -1) {
        $rootScope.groupedToursArray.splice(index, 1);
        // Gọi hàm tính tổng tiền sau khi xóa tour
        $rootScope.tinhTongTienTours();
      }
    };

    // Đọc dữ liệu từ file json
    $http.get("data/tour.json").then(function (response) {
      $scope.products = response.data;

      $scope.count = function (name) {
        $rootScope.test++;
        var newUserCopy = angular.copy(name);
        var existingTourIndex = $rootScope.tours.findIndex(
          (tour) => tour.id === newUserCopy.id
        );

        if (existingTourIndex !== -1) {
          // Nếu tour đã tồn tại, tăng giá trị quantity của tour cụ thể
          $rootScope.tours[existingTourIndex].quantity++;
        } else {
          // Nếu tour chưa tồn tại, thêm mới và đặt quantity là 1
          newUserCopy.quantity = 1;
          $rootScope.tours.push(newUserCopy);
        }

        // Tính tổng quantity từ tất cả các tours
        $rootScope.quantity = $rootScope.tours.reduce(
          (total, tour) => total + tour.quantity,
          0
        );

        // Gộp dữ liệu ở đây
        var groupedTours = {};
        for (var i = 0; i < $rootScope.tours.length; i++) {
          var tour = $rootScope.tours[i];
          if (!groupedTours[tour.id]) {
            groupedTours[tour.id] = tour;
          } else {
            groupedTours[tour.id].price += tour.price;
            groupedTours[tour.id].duration += tour.duration;
            groupedTours[tour.id].quantity += tour.quantity;
          }
        }

        // Cập nhật biến groupedToursArray
        $rootScope.groupedToursArray = Object.values(groupedTours);
        $rootScope.tinhTongTienTours();
      };

      // Lấy sản phẩm với id tương ứng
      var foundProduct = $scope.products.find(
        (item) => item.id == $routeParams.id
      );
      $scope.detailPro = foundProduct;

      $scope.changeMainImage = function (thumbnailSrc) {
        $scope.detailPro.image = thumbnailSrc;
      };

      $scope.resetMainImage = function () {
        $scope.detailPro.image = $scope.detailPro.originalImage;
      };
      $scope.detailPro.originalImage = $scope.detailPro.image;
    });
  }
);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/datcho", {
      templateUrl: "Component/DatCho.html",
      controller: "myCtrl",
    })
    .when("/home", {
      templateUrl: "Component/Home.html",
      controller: "homeCtrl",
    })
    .when("/login", {
      templateUrl: "Component/login.html",
      controller: "loginCtrl",
    })
    .when("/signup", {
      templateUrl: "Component/signup.html",
      controller: "loginCtrl",
    })
    .when("/gioithieu", {
      templateUrl: "Component/GioiThieu.html",
      controller: "myCtrl",
    })
    .when("/giohang", {
      templateUrl: "Component/GioHang.html",
      controller: "gioHangCtrl",
    })
    .when("/chitiet/:id", {
      templateUrl: "Component/ChiTiet.html",
      controller: "homeCtrl",
    })
    .otherwise({
      templateUrl: "Component/Home.html",
      controller: "homeCtrl",
    });
});

// Header
window.addEventListener("scroll", function () {
  var headerTop = document.querySelector(".header-top");
  var headerBot = document.querySelector(".header-bottom");
  var header = document.querySelector(".header");
  if (this.window.scrollY > 450) {
    header.classList.remove("fixed-top");
    headerTop.classList.remove("fixed-top");
    headerBot.classList.add("fixed-top");
  } else if (this.window.scrollY < 450) {
    headerBot.classList.remove("fixed-top");
    header.classList.add("fixed-top");
  }
});

// Thong bao
const audio = document.querySelector("audio");
$(document).ready(function () {
  $("#modal-thong-bao").modal("show");

  $("#modal-thong-bao").on("click", ".btn-dong-y", function () {
    $("#modal-thong-bao").modal("hide");
    audio.play();
  });
});
