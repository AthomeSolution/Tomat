'use strict';

angular.module('backendInterfaceApp')
    .controller('LoginCtrl',
    function ($scope, $location, auth) {

        $scope.doLogin = function () {
            auth.login($scope.login, $scope.password, function(result) {
                $location.path('/');
            }, function(error) {
                $scope.error = error;
            });
        };

        $scope.doRegister = function() {
            auth.register($scope.login, $scope.password, $scope.email, function(result) {
                $location.path('/');
            }, function(error) {
                $scope.error = error;
            });
        };

        $scope.doResetPassword = function() {
            auth.resetPassword($scope.login).then(
                function(result) {
                    $scope.success = "An e-mail has been sent to reset your password.";
                },
                function(error) {
                    $scope.error = error.data.message;
                }
            );
        }


    });
