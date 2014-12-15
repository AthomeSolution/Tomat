(function () {
  'use strict';

  angular.module('EcreateIonic').directive('poiFiltersHotel', function ($rootScope, $location, $ionicActionSheet, $ionicSlideBoxDelegate, localize, config_poi) {
    return {
      restrict: 'EC',
      templateUrl: 'templates/hotel/filters.html',
      replace: true,
      link: function (scope, elements, attributes) {
        if ($rootScope.currentFiltersScope) {
          scope.distance = $rootScope.currentFiltersScope.distance;
          scope.city = $rootScope.currentFiltersScope.city;
          scope.capacity = $rootScope.currentFiltersScope.capacity;
          scope.price = $rootScope.currentFiltersScope.price;
          scope.pricerange = $rootScope.currentFiltersScope.pricerange;
          scope.rate = $rootScope.currentFiltersScope.rate;
          scope.hotel = $rootScope.currentFiltersScope.hotel;
          scope.gite = $rootScope.currentFiltersScope.gite;
          scope.dhote = $rootScope.currentFiltersScope.dhote;
          scope.camping = $rootScope.currentFiltersScope.camping;
          scope.insolite = $rootScope.currentFiltersScope.insolite;
          scope.other = $rootScope.currentFiltersScope.other;
        } else {
          scope.distance = 0;
          scope.price = 0;
          scope.pricerange = 500;
          scope.rate = 0;
        }

        scope.$watch('distance', function (value) {
          scope.validateFilters();
        });
        scope.$watch('city', function (value) {
          scope.validateFilters();
        });
        scope.$watch('capacity', function (value) {
          scope.validateFilters();
        });
        scope.$watch('price', function (value) {
          scope.validateFilters();
        });
        scope.$watch('pricerange', function (value) {
          scope.validateFilters();
        });
        scope.$watch('rate', function (value) {
          scope.validateFilters();
        });
        scope.$watch('hotel', function (value) {
          scope.validateFilters();
        });
        scope.$watch('gite', function (value) {
          scope.validateFilters();
        });
        scope.$watch('camping', function (value) {
          scope.validateFilters();
        });
        scope.$watch('insolite', function (value) {
          scope.validateFilters();
        });
        scope.$watch('other', function (value) {
          scope.validateFilters();
        });

        $rootScope.currentFiltersScope = scope;

        var filterFn = function (item) {

          var checkDistance = true;
          if (item.distance && scope.distance > 0) checkDistance = item.real_distance <= (scope.distance * 1000);


          var checkCity = scope.city === undefined || scope.city == '' || scope.city == item.commune;

          var checkCapacity = true;
          if (item.capacity && scope.capacity) {
            if (scope.capacity == '-4') checkCapacity = item.capacity <= 4;
            if (scope.capacity == '-6') checkCapacity = item.capacity <= 6;
            if (scope.capacity == '+6') checkCapacity = item.capacity > 6;
          }

          var checkPrice = true;
          if (item.priceNight && scope.price != undefined && scope.pricerange != undefined) {
            var priceNight = parseFloat(item.priceNight);
            checkPrice = priceNight >= scope.price && priceNight <= scope.pricerange;
          }

          var checkRate = true;
          if (scope.rate) {
            checkRate = true; //TODO
          }

          var checkTypes = scope.hotel || scope.gite || scope.camping || scope.insolite || scope.other;
          var checkHotel = false;
          if (scope.hotel && item.typeHebergement == "hotel") {
            checkHotel = true;
          }
          var checkGite = false;
          if (scope.gite && item.typeHebergement == "gite") {
            checkGite = true;
          }
          var checkDhote = false;
          if (scope.dhote && item.typeHebergement == "dhote") {
            checkDhote = true;
          }
          var checkCamping = false;
          if (scope.camping && item.typeHebergement == "camping") {
            checkCamping = true;
          }
          var checkInsolite = false;
          if (scope.insolite && item.typeHebergement == "insolite") {
            checkInsolite = true;
          }
          var checkOther = false;
          if (scope.other && item.typeHebergement == "other") {
            checkOther = true;
          }

          return checkDistance && checkCity && checkCapacity && checkPrice && checkRate && (!checkTypes || checkHotel || checkGite || checkDhote || checkCamping || checkInsolite || checkOther );
        }

        scope.validateFilters = function () {
          ionic.trigger('filtersChanged', {filterFn: filterFn});
        }

        scope.closeFilters = function () {
          scope.validateFilters();
          ionic.trigger('filtersClose');
        }
      }
    }
  });
})();
