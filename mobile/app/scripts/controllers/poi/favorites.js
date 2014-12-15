'use strict';
angular.module('EcreateIonic.controllers.poi.favorites', [])
  .controller('PoiFavoritesCtrl', function ($scope, $rootScope, $location, $stateParams, $filter, $timeout, $ionicSideMenuDelegate, localize, $ionicSlideBoxDelegate, $ionicPopup, config_poi, template, persist, mapmarkers, $ionicActionSheet, socialsharing) {
    $timeout(function () {
      $ionicSlideBoxDelegate.update();
    }, 200);

    if ($stateParams.id == 'all') {
      $scope.book = {id: 'all', name: localize.getLocalizedString('FAVORITES'), pois: {}};
      $scope.isAll = true;
      for (var favoriteIndex in $rootScope.userData.favorites) {
        var favorite = $rootScope.userData.favorites[favoriteIndex];
        for (var bookIndex in favorite.pois) {
          $scope.book.pois[bookIndex] = favorite.pois[bookIndex];
        }
      }
    } else {
      $scope.isAll = false;
      for (var favoriteIndex in $rootScope.userData.favorites) {
        var favorite = $rootScope.userData.favorites[favoriteIndex];
        if (favorite.name == $stateParams.id) {
          $scope.book = favorite;
          break;
        }
      }
    }

    $scope.toggleShowMap = function () {
      $scope.showMap = !$scope.showMap;
    };

    $scope.toggleFilters = function () {
      $ionicSideMenuDelegate.$getByHandle('filters-menu').toggleRight();
    };

    $scope.mapOptions = mapmarkers.getOptions();

    var updateMarkers = function () {
      $scope.markers = [];
      angular.forEach($scope.allmarkers, function (value) {
        if ($scope.filterFn(value.item))
          $scope.markers.push(value);
      });
    };

    $scope.internal_pois_favoris = [];
    // FIXME use query with type filtered: http://www.baasbox.com/code-documentation/rest-api/rest-general
    persist.list('poi').then(function (data) {
      $scope.pois = [];
      $scope.markers = [];
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (config_poi[obj.type]) {
          $scope.internal_pois_favoris[obj.id] = obj;
          if (obj.id in $scope.book.pois) {
            obj.comment = $scope.book.pois[obj.id];
            obj.hasFavorite = true;
            $scope.pois.push(obj);
          }
        }
      }

      mapmarkers.createMarkers($scope.pois).then(function (markers) {
        $scope.allmarkers = markers;
        updateMarkers();
      });
    });

    $scope.selectorTypes = $rootScope.placeTypes;

    $scope.filterFn = function (poi) {
      var filterCond = $scope.selectedFilters.length == 0 || $scope.selectedFilters.indexOf(poi.type) > -1;
      var selectorCond = (!$scope.currentSelectorType)
        || ($scope.currentSelectorType.id == 'ALL');
      // var favoriteCond = poi.favorite && (($scope.book.id == 'all') || (poi.favorite.indexOf($scope.book.id) > -1));

      return filterCond && selectorCond;
    };

    $scope.currentSelectorTypeChanged = function (type) {
      $scope.currentSelectorType = type;
      updateMarkers();
    };

    $scope.selectedFilters = [];
    $scope.filtersChanged = function (filters) {
      $scope.toggleFilters();
      $scope.selectedFilters = filters;
      updateMarkers();
    };

    $scope.share = function () {
      $ionicPopup.show({
        templateUrl: 'templates/poi/popup-share.html',
        title: localize.getLocalizedString('Share this favorite book'),
        scope: $scope,
        buttons: [
          {
            text: localize.getLocalizedString('Close'),
            onTap: function (e) {
              return true;
            }
          }
        ]
      }).then(function (res) {
      }, function (err) {
      }, function (popup) {
        $scope.popup = popup;
      });
    };

    var getFilteredPois = function () {
      var filteredPois = [];
      angular.forEach($scope.pois, function (value, key) {
        if ($scope.filterFn(value))
          filteredPois[key] = value;
      });
      return filteredPois;
    };

    $scope.facebookShare = function () {
      socialsharing.facebookShareFavorites($scope.book, getFilteredPois());
    };

    $scope.twitterShare = function () {
      socialsharing.twitterShareFavorites($scope.book, getFilteredPois());
    };

    $scope.tripadvisorShare = function () {
      socialsharing.tripadvisorShareFavorites($scope.book, getFilteredPois());
    };

    $scope.emailShare = function () {
      socialsharing.emailShareFavorites($scope.book, getFilteredPois());
    };

    $scope.smsShare = function () {
      socialsharing.smsShareFavorites($scope.book, getFilteredPois());
    }
  });
