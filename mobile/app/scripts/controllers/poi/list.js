'use strict';
angular.module('EcreateIonic.controllers.poi.list', [])
  .controller('PoiListCtrl', function ($scope, $rootScope, $location, $stateParams, $filter, $timeout, $ionicSideMenuDelegate, utils, localize, $ionicSlideBoxDelegate, $ionicPopup, config, config_poi, template, persist, mapmarkers,$window) {
    $timeout(function () {
      $ionicSlideBoxDelegate.update();
    }, 200);

    $scope.toggleShowMap = function () {
      $scope.showMap = !$scope.showMap;
//      if ($scope.showMap) {
//        if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(function (position) {
//            $scope.mapOptions.center = position.coords;
//          });
//        }
//      }
    };
    $scope.toggleFilters = function () {
    //  alert('ddd');
      $ionicSideMenuDelegate.$getByHandle('filters-menu').toggleRight();
    };

    $scope.mapOptions = mapmarkers.getOptions();
    $scope.filter = config_poi[$stateParams.filter];
    $scope.orderby = $scope.filter.orderby;
    $scope.widthOfFilter = ($window.innerWidth)-46;
    $scope.cities = [];

    var updateDistances = function () {
      $timeout(updateDistances, 30000);
      if (!$scope.lat) return;
      angular.forEach($scope.allpois, function (value) {
        var currentLatlng = new google.maps.LatLng($scope.lat, $scope.lon);
        var poiLatlng = new google.maps.LatLng(value.lat, value.lng);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLatlng, poiLatlng);
        value.real_distance = distance;
        var unit = "m";
        if (distance > 1000) {
          distance = distance / 1000;
          unit = "km";
        }
        value.distance = parseInt(distance) + ' ' + unit;
      });
    };

    var updateMarkers = function () {
      $scope.markers = [];
      angular.forEach($scope.allmarkers, function (value) {
        if ($scope.filterFn(value.item))
          $scope.markers.push(value);
      });
    };

    var query = null;
    if ($scope.filter !== null) {
      query = 'type="' + $scope.filter.type + '"';
    }
    if ($scope.filter.type == 'events') {
      var now = new Date();
      query = 'type="events" and (endPublication = 0 OR endPublication > ' + now.getTime() + ')';
    }

    var collection = 'poi';
    if ($scope.filter.type == 'ugc') {
      collection = 'ugc';
      query = null;
    }


    persist.list(collection, query).then(function (data) {
      var data = data.slice(0, config.listMaxSize);
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (obj.fields) {
          for (var j = 0; j < obj.fields.length; j++) {
            var field = obj.fields[j];
            if (field.type === "date") {
              obj[field.path] = new Date(obj[field.path].replace(' ', 'T'));
            }
          }
        }
        if (obj.typeHebergement != undefined) {
          var type = obj.typeHebergement.replace('ô', 'o').replace('é', 'e').replace("'", "").toLowerCase();

          if (type.indexOf("hotel") > -1)
            obj.typeHebergement = 'hotel';
          else if (type.indexOf("gite") > -1 || type.indexOf("meuble") > -1 || type.indexOf("location") > -1 || type.indexOf("appartement") > -1 || type.indexOf("maison") > -1)
            obj.typeHebergement = 'gite';
          else if (type.indexOf("dhote") > -1)
            obj.typeHebergement = 'dhote';
          else if (type.indexOf("camping") > -1)
            obj.typeHebergement = 'camping';
          else if (type.indexOf("insolite") > -1)
            obj.typeHebergement = 'insolite';
          else
            obj.typeHebergement = 'other';
        }
        obj.hasFavorite = $rootScope.getBooks(obj);

        if (obj.commune !== undefined && obj.commune != "" && $scope.cities.indexOf(obj.commune) < 0)
          $scope.cities.push(obj.commune);
      }

      var filtered2 = [];
      if (config_poi[$scope.filter.type].groupby) {
        var filtered = [];
        angular.forEach(data, function (item) {
          var week = utils.getWeek(item.startDate);
          var begin = utils.getBeginDate(item.startDate);
          var end = utils.getEndDate(item.startDate);

          var key = localize.getLocalizedString('FROM') + ' ' + $filter('date')(begin, 'dd/MM') + ' ' + localize.getLocalizedString('TO') + ' ' + $filter('date')(end, 'dd/MM');

          if (filtered[key] == undefined) filtered[key] = [];
          filtered[key].push(item);
        });

        for (var week in filtered) {
          var list = filtered[week];
          filtered2.push({key: week, data: list });
        }
      } else {
        filtered2 = [
          {key: '', data: data}
        ];
      }

      $scope.allpois = data;
      $scope.pois = filtered2;
      $scope.markers = [];
      mapmarkers.createMarkers(data).then(function(markers) {
        $scope.allmarkers = markers;
        updateMarkers();
      });

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          var b = !$scope.lat;
          $scope.lat = position.coords.latitude;
          $scope.lon = position.coords.longitude;
          if (b) updateDistances();
        }, function () {
        }, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        });
      }
    });

    $scope.selectorTypes = $rootScope.placeTypes;

    $scope.filterFn = function (poi) {
      if ($scope.selectedFilters)
        return $scope.selectedFilters(poi);
      return true;
    };

    $scope.currentSelectorTypeChanged = function (type) {
      $scope.currentSelectorType = type;
      updateMarkers();
    };

    ionic.on('filtersChanged', function (event) {
      $scope.selectedFilters = event.detail.filterFn;
      updateMarkers();
      //$scope.filtersChanged(event.detail.filters);
    });

    ionic.on('filtersClose', function (event) {
      $scope.toggleFilters();
      updateMarkers();
    });
  });
