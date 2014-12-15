'use strict';
angular.module('EcreateIonic.controllers.discover.show', [])
    .controller('DiscoverShowCtrl', function ($scope, $window, $timeout, $stateParams, $ionicActionSheet, persist, $ionicSlideBoxDelegate, $compile) {
        $scope.id = $stateParams.id;
        $timeout(function () {
            $ionicSlideBoxDelegate.update();
        }, 500);
        persist.get('contents', $stateParams.id).then(function (data) {

            var html = $compile(data.content.replace('\\',''))($scope);
            $scope.html = html
            $scope.discover = data;
        });
    });
