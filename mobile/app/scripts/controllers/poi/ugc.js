'use strict';

angular.module('EcreateIonic.controllers.ugc', [])
  .controller('UgcCtrl', function ($scope, $rootScope, $location, $window, baasbox, camera, persist, mapmarkers, $stateParams) {
    $scope.error = null;
    $scope.id = $stateParams.id;
    $scope.mapOptions = mapmarkers.getOptions();
    $scope.markers = [
      {
        id: 'id',
        coords: {
          latitude: 47.459605,
          longitude: 3.518769
        },
        icon: {
          path: fontawesome.markers['MAP_MARKER'],
          anchor: new google.maps.Point(32, -32),
          scale: 0.5,
          strokeWeight: 0.2,
          strokeColor: 'black',
          strokeOpacity: 1,
          fillColor: 'yellow',
          fillOpacity: 1
        }
      }
    ];

    $scope.ugc = {type: "ugc"};

    baasbox.getDocument("ugc", $scope.id).then(function (response) {
      $scope.ugc = response;
    });
    baasbox.listDocuments("ugc").then(function (response) {
      $scope.ugcs = response;
    });

    $scope.takePicture = function () {
      camera.getPicture().then(function (imageData) {
        $scope.ugc.image = imageData;
      }, function (message) {
        $scope.error = 'Pas de photo prise: ' + message;
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $scope.markers[0].coords = position.coords;
        $scope.mapOptions.center = position.coords;
      });
    }

    $scope.doSave = function () {
      $scope.ugc.lat = $scope.markers[0].latitude;
      $scope.ugc.lng = $scope.markers[0].longitude;
      $scope.ugc.user = $rootScope.logged_username;
      baasbox.createOrUpdate("ugc", $scope.ugc).then(function (response) {
          if (response.private) {
            baasbox.removeRight("ugc", response.id)
          } else {
            baasbox.grantRights("ugc", response.id)
          }
          $scope.$apply($location.path("ugc/" + response.id));
        }
      );
    }
  });
