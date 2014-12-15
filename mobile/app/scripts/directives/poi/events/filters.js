(function () {
    'use strict';

        angular.module('EcreateIonic').directive('poiFiltersEvents', function($rootScope, $location, $ionicActionSheet, $ionicSlideBoxDelegate, localize, config_poi) {
        return {
            restrict: 'EC',
            templateUrl: 'templates/events/filters.html',
            replace: true,
            link: function(scope, elements, attributes) {
                if($rootScope.currentFiltersScope) {
                    scope.distance = $rootScope.currentFiltersScope.distance;
                    scope.city = $rootScope.currentFiltersScope.city;
                    scope.type = $rootScope.currentFiltersScope.type;
                } else {
                    scope.distance = 0;
                    scope.price = 0;
                    scope.pricerange = 500;
                    scope.rate = 0;
                }

                scope.$watch('distance', function(value) { scope.validateFilters();});
                scope.$watch('city', function(value) { scope.validateFilters();});
                scope.$watch('type', function(value) { scope.validateFilters();});

                $rootScope.currentFiltersScope = scope;

                var filterFn = function(item) {
                    var checkDistance = true;
                    if(item.distance && scope.distance>0) checkDistance = item.real_distance <= (scope.distance*1000);

                  var checkCity = scope.city === undefined || scope.city == '' || scope.city == item.commune;

                    var checkType = true;
                    if(scope.type) {
                        checkType = true; //TODO
                    }
                    return checkDistance && checkCity && checkType;
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
