'use strict';

angular.module('EcreateIonic.controllers.auth', [])
  .controller('AuthCtrl', function ($scope, $rootScope, $location, $window, $ionicViewService, baasbox) {
    $scope.username = '';
    $scope.password1 = '';
    $scope.password2 = '';
    $scope.civility = '';
    $scope.name = '';
    $scope.email = '';
    $scope.country = 'France';
    $scope.department = '';
    $scope.error = null;

    $rootScope.$watch('logged_username', function (username) {
      if (username != null && username != "" && username != "admin") {
        baasbox.getProfile(username)
          .then(function (result) {
            $scope.user = result;
          });
      }
    });

    $scope.doRegister = function (username, password1, password2, civility, name, email, country, department) {
      var data = { civility: civility, name: name, email: email, country: country, department: department };
      baasbox.register(username, password1, data,
        function (result) {
          $location.path('/account');
        }, function (error) {
          $scope.error = error;
        }
      );
    };

    $scope.doUpdateAccount = function (username, password1, password2, email) {
      baasbox.setProfile(username, $scope.user).then(function () {
        $scope.success = "Saved";
      });
    };

    $scope.doLogin = function (username, password) {
      baasbox.login(username, password, function () {
        $ionicViewService.clearHistory();
        var url = $location.search().url;
        if (url == null) url = '/';
        $location.path(url).search({url: null});
      }, function (error) {
        $scope.error = error;
      });
    };

    $scope.doResetPassword = function (username) {
      baasbox.resetPassword(username).then(function () {
        $scope.success = "Password reset";
      });
    }
  });
