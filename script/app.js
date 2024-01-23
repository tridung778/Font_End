var myApp = angular.module("myApp", ["ngRoute"]);

myApp.controller(
  "homeCtrl",
  function ($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];
    //Đọc dữ liệu từ file json
    $http.get("data/tourTrongNuoc.json").then(function (response) {
      $scope.products = response.data;
      console.log($scope.products[1].name);
      //Khúc này là chuyển từ id để lấy sản phẩm
      $scope.detailPro = $scope.products.find(
        (item) => item.id == $routeParams.id
      );
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
      controller: "myCtrl",
    })
    .when("/signup", {
      templateUrl: "Component/signup.html",
      controller: "myCtrl",
    })
    .when("/gioithieu", {
      templateUrl: "Component/GioiThieu.html",
      controller: "myCtrl",
    })
    .when("/giohang", {
      templateUrl: "Component/GioHang.html",
      controller: "gioHangCtrl",
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
