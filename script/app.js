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
    $rootScope.maxQuantity = 8;
    $rootScope.giamGia = 1;
    $scope.sort = "Price";
    $scope.user = "";

    // Đọc dữ liệu từ file json
    $http.get("data/tour.json").then(function (response) {
      $rootScope.products = response.data;

      $rootScope.checkProduct = function (id) {
        $rootScope.id = id;
        console.log(id);
        $rootScope.detailPro = $rootScope.products.find(
          (item) => item.id == $rootScope.id
        );
      };

      $rootScope.count = function (name) {
        Toastify({
          text: "Thêm vào giỏ hàng thành công",
          duration: 3000,
          position: "left", // `left`, `center` or `right`
          style: {
            background: "linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)",
          },
        }).showToast();

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

      // Đổi ảnh khi hover
      $rootScope.changeMainImage = function (thumbnailSrc) {
        if ($rootScope.detailPro) {
          $rootScope.detailPro.image = thumbnailSrc;
        }
      };

      $rootScope.resetMainImage = function () {
        if ($rootScope.detailPro && $rootScope.detailPro.originalImage) {
          $rootScope.detailPro.image = $rootScope.detailPro.originalImage;
        }
      };

      $rootScope.$watch("detailPro", function (newDetailPro) {
        if (newDetailPro) {
          newDetailPro.originalImage = newDetailPro.image;
        }
      });

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
      var index = $rootScope.tours.findIndex((t) => t.id === tour.id);
      console.log("Index của tour cần xóa:", index);
      if (index !== -1) {
        $rootScope.tours.splice(index, 1);
        $rootScope.groupedToursArray.splice(index, 1);
        // Gọi hàm tính tổng tiền sau khi xóa tour
        $rootScope.tinhTongTienTours();
      }
    };

    $http.get("data/account.json").then(function (response) {
      $rootScope.accounts = response.data;

      $rootScope.insert = function () {
        var newUserCopy = angular.copy($rootScope.account);
        $rootScope.accounts.push(newUserCopy);
        Toastify({
          text: "Đăng ký thành công",
          duration: 3000,
          position: "left", // `left`, `center` or `right`
          style: {
            background: "linear-gradient(to right, #4776E6, #8E54E9)",
          },
        }).showToast();
      };

      $scope.checkLogin = function () {
        $rootScope.checkWrong = true;
        $scope.index = 0;

        $rootScope.accounts.forEach((account) => {
          if (
            account.username == $scope.$$childTail.userName &&
            account.password == $scope.$$childTail.passWord
          ) {
            window.location.href = "#!home";
            $scope.user = account.username;
            Toastify({
              text: "Đăng nhập thành công",
              duration: 3000,
              position: "left",
              style: {
                background: "linear-gradient(to right, #4776E6, #8E54E9)",
              },
            }).showToast();
            $rootScope.checkWrong = false;
          }
        });
        if ($rootScope.checkWrong) {
          console.log("Login fail");
          Toastify({
            text: "Đăng nhập thất bại",
            duration: 3000,
            position: "left",
            style: {
              background: "linear-gradient(to right, #4776E6, #8E54E9)",
            },
          }).showToast();
        }
      };

      $scope.changePassword = function (username, newPassword) {
        $rootScope.checkWrong = true;
        $rootScope.accounts.forEach((account) => {
          if (
            account.username == $scope.$$childTail.userName &&
            account.password == $scope.$$childTail.passWord
          ) {
            for (var i = 0; i < $scope.accounts.length; i++) {
              if ($scope.accounts[i].username === username) {
                $scope.accounts[i].password = newPassword;
                window.location.href = "#!home";
                break;
              }
            }
            Toastify({
              text: "Đổi mật khẩu thành công!",
              duration: 3000,
              position: "left",
              style: {
                background: "linear-gradient(to right, #4776E6, #8E54E9)",
              },
            }).showToast();
            $rootScope.checkWrong = false;
          }
        });
        if ($rootScope.checkWrong) {
          Toastify({
            text: "Tài khoản hoặc mật khẩu không chính xác",
            duration: 3000,
            position: "left",
            style: {
              background: "linear-gradient(to right, #4776E6, #8E54E9)",
            },
          }).showToast();
        }
      };
    });

    $scope.exit = function () {
      $scope.user = null;
      window.location.href = "#!login";
    };

    $scope.searchProduct = function () {
      $rootScope.searchName = $scope.$$childHead.$rootScope.searchItem;
    };

    $scope.updateQuantityEntity = function () {
      $rootScope.maxQuantity = $scope.$$childTail.quantityEntity;
      console.log($rootScope.products.price);
      console.log($scope.$$childTail.quantityEntity);
    };

    $scope.updatePriceEntity = function () {
      if ($scope.$$childTail.price == "Thấp - cao") {
        $scope.sort = "price";
        console.log("sorting");
      } else if ($scope.$$childTail.price == "Cao - thấp") {
        $scope.sort = "-price";
        console.log("sorting");
      }
    };

    $scope.tinhGiamGia = function () {
      $http.get("data/coupon.json").then(function (response) {
        $rootScope.coupons = response.data;
        $scope.checkGiamGia = true;
        $rootScope.coupons.forEach((coupon) => {
          if (coupon.code == $rootScope.$$childHead.$$childTail.Coupon) {
            $rootScope.giamGia = 1 - (coupon.percent * 1) / 100;
            $scope.checkGiamGia = false;
          }
        });
        if ($scope.checkGiamGia) {
          $rootScope.giamGia = 1;
        }
      });
    };
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
    .when("/changePass", {
      templateUrl: "Component/changePass.html",
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
      templateUrl: "Component/login.html",
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

function datHang() {
  Toastify({
    text: "Thanh toán thành công",
    duration: 3000,
    position: "left", // `left`, `center` or `right`
    style: {
      background: "linear-gradient(to right, #e55d87, #5fc3e4)",
    },
  }).showToast();
}
