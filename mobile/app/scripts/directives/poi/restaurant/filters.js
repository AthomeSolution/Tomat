(function () {
    'use strict';

    angular.module('EcreateIonic').directive('poiFiltersRestaurant', function($rootScope, $location, $ionicActionSheet, $ionicSlideBoxDelegate, localize, config_poi) {
        return {
            restrict: 'EC',
            templateUrl: 'templates/restaurant/filters.html',
            replace: true,
            link: function(scope, elements, attributes) {
                if($rootScope.currentFiltersScope) {
                    scope.distance = $rootScope.currentFiltersScope.distance;
                    scope.city = $rootScope.currentFiltersScope.city;
                    scope.capacity = $rootScope.currentFiltersScope.capacity;
                    scope.price = $rootScope.currentFiltersScope.price;
                    scope.pricerange = $rootScope.currentFiltersScope.pricerange;
                    scope.rate = $rootScope.currentFiltersScope.rate;
                } else {
                    scope.distance = 0;
                    scope.price = 0;
                    scope.pricerange = 500;
                    scope.rate = 0;
                }

                scope.$watch('distance', function(value) { scope.validateFilters();});
                scope.$watch('city', function(value) { scope.validateFilters();});
                scope.$watch('capacity', function(value) { scope.validateFilters();});
                scope.$watch('price', function(value) { scope.validateFilters();});
                scope.$watch('pricerange', function(value) { scope.validateFilters();});
                scope.$watch('rate', function(value) { scope.validateFilters();});

                $rootScope.currentFiltersScope = scope;

                var filterFn = function(item) {
                    var checkDistance = true;
                    if(item.distance && scope.distance>0) checkDistance = item.real_distance <= (scope.distance*1000);

                  var checkCity = scope.city === undefined || scope.city == '' || scope.city == item.commune;

                    var checkCapacity = true;
                    if(item.capacity && scope.capacity) {
                        if (scope.capacity == '-4') checkCapacity = item.capacity <= 4;
                        if (scope.capacity == '-6') checkCapacity = item.capacity <= 6;
                        if (scope.capacity == '+6') checkCapacity = item.capacity > 6;
                    }

                    var checkPrice = true;
                    if(item.priceNight && scope.price != undefined && scope.pricerange != undefined) {
                        var priceNight = parseFloat(item.priceNight);
                        checkPrice = priceNight >= scope.price && priceNight <= scope.pricerange;
                    }

                    var checkRate = true;
                    if(scope.rate) {
                        checkRate = true; //TODO
                    }

                    return checkDistance && checkCity && checkCapacity && checkPrice && checkRate;
                }

                scope.validateFilters = function() {
                    ionic.trigger('filtersChanged', {filterFn: filterFn});
                }

                scope.closeFilters = function() {
                    scope.validateFilters();
                    ionic.trigger('filtersClose');
                }
            }
        }
    })
    ;
})();
