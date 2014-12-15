'use strict';
angular.module('EcreateIonic.controllers.wifi', [])
  .controller('WifiListCtrl', function ($scope, $timeout, $ionicSlideBoxDelegate, config, mapmarkers) {
    $timeout(function () {
      $ionicSlideBoxDelegate.update();
    }, 200);

    $scope.mapOptions = mapmarkers.getOptions();
    $scope.markers = mapmarkers.createWifiMarkers(config.wifi);
  });
