//show password
function myFunction() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

myApp.controller("loginCtrl", function ($scope, $rootScope, $http) {
  $rootScope.accounts = [];
  $rootScope.account = {};
  $http.get("data/account.json").then(function (response) {
    $rootScope.accounts = response.data;
    console.log($rootScope.accounts);

    $rootScope.insert = function () {
      var newUserCopy = angular.copy($rootScope.account);
      $rootScope.accounts.push(newUserCopy);
      console.log($rootScope.accounts);
    };

    $scope.checkLogin = function () {
      $scope.checkWrong = true;
      $scope.accounts.forEach((account) => {
        if (
          (account.username == $scope.username) &
          (account.password == $scope.password)
        ) {
          console.log("dang nhap thanh cong");
          $scope.checkWrong = false;
        }
      });
      if ($scope.checkWrong) {
        console.log("that bai");
      }
    };
  });
});
