'use strict';

angular.module('backendInterfaceApp')
    .controller('MainMenuCtrl',
    function ($scope, $location, auth, baasbox) {
        $scope.isLoggedIn = auth.isLoggedIn();
        $scope.modalShown = false;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };
        $scope.logout = function () {
            auth.logout();
            $location.path('/login');
        };



    });
