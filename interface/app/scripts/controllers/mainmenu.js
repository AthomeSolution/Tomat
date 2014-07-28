'use strict';

angular.module('backendInterfaceApp')
    .controller('MainMenuCtrl',
    function ($scope, $location, auth, baasbox, config) {
        $scope.isLoggedIn = auth.isLoggedIn();
        $scope.modalShown = false;
        $scope.socialNetworkShown = false;
        $scope.instagramChecked = false;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };
        $scope.toggleSocialNetworkShown = function(){
            $scope.socialNetworkShown = !$scope.socialNetworkShown;
        }

        $scope.enableInstagram = function(){
            config.useInstagram = !config.useInstagram;
        }

        $scope.logout = function () {
            auth.logout();
            $location.path('/login');
        };



    });
