'use strict';

angular.module('backendInterfaceApp')
    .controller('MainMenuCtrl',
    function ($scope, $location, auth, baasbox) {
        $scope.isLoggedIn = auth.isLoggedIn();
        $scope.modalShown = false;
        $scope.logout = function () {
            auth.logout();
            $location.path('/login');
        };

        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

    })
    .directive('modalDialog', function () {
        return {
            restrict: 'E',
            scope: {
                show: '=',
                dialogTitle: '@',
                onClose: '&?'
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            templateUrl: 'partials/modal.html'

        }
    });