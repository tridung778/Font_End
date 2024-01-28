var myApp = angular.module("myApp", ["ngRoute"]);

myApp.controller(
  "homeCtrl",
  function ($scope, $rootScope, $routeParams, $route, $http) {
    $rootScope.products = [];
    $rootScope.tours = [];
    $rootScope.tour = {};
    $rootScope.groupedToursArray = [];
    $rootScope.quantity = 0;
    $rootScope.tongQuantity = 0;
    $rootScope.accounts = [];
    $rootScope.account = {};

    // Đọc dữ liệu từ file json
    $http.get("data/tour.json").then(function (response) {
      $rootScope.products = response.data;
      $rootScope.detailPro = $rootScope.products.find(
        (item) => item.id == $route.current.params.id
      );

      $rootScope.count = function (name) {
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

      $rootScope.changeMainImage = function (thumbnailSrc) {
        $rootScope.detailPro.image = thumbnailSrc;
      };

      $rootScope.resetMainImage = function () {
        $rootScope.detailPro.image = $rootScope.detailPro.originalImage;
      };
      $rootScope.detailPro.originalImage = $rootScope.detailPro.image;
    });

    $rootScope.tinhTongTienTours = function () {
      let tongTienTours = 0;
      angular.forEach($rootScope.groupedToursArray, function (tour) {
        tongTienTours += tour.price * tour.quantity;
      });
      $rootScope.tongTienTours = tongTienTours;
      $rootScope.tongQuantity = 0;
      $rootScope.totalQuantity();
    };

    $rootScope.totalQuantity = function () {
      angular.forEach($rootScope.groupedToursArray, function (tour) {
        $rootScope.tongQuantity += tour.quantity;
      });
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

    $http.get("data/account.json").then(function (response) {
      $rootScope.accounts = response.data;

      console.log($rootScope);
      console.log($rootScope);

      $rootScope.insert = function () {
        var newUserCopy = angular.copy($rootScope.account);
        $rootScope.accounts.push(newUserCopy);
        console.log($rootScope.accounts);
      };

      $rootScope.checkLogin = function () {
        $rootScope.checkWrong = true;

        $rootScope.accounts.forEach((account) => {
          console.log("Checking:", $rootScope.username, $rootScope.password);
          if (
            account.username == $rootScope.username &&
            account.password == $rootScope.password
          ) {
            console.log("Login successful");
            $rootScope.checkWrong = false;
          }
        });
        if ($rootScope.checkWrong) {
          console.log("that bai");
        }
      };
    });
  }
);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/datcho", {
      templateUrl: "Component/DatCho.html",
    })
    .when("/home", {
      templateUrl: "Component/Home.html",
    })
    .when("/login", {
      templateUrl: "Component/login.html",
    })
    .when("/signup", {
      templateUrl: "Component/signup.html",
    })
    .when("/gioithieu", {
      templateUrl: "Component/GioiThieu.html",
    })
    .when("/giohang", {
      templateUrl: "Component/GioHang.html",
    })
    .when("/chitiet/:id", {
      templateUrl: "Component/ChiTiet.html",
    })
    .otherwise({
      templateUrl: "Component/Home.html",
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
