(function () {
    'use strict';

    angular.module('EcreateIonic').directive('poiFiltersCategories', function ($rootScope, $location, $ionicActionSheet, $ionicSlideBoxDelegate, localize, config_poi) {
        return {
            restrict: 'E',
            templateUrl: 'templates/poi/poi_filters_categories.html',
            replace: true,
            scope: {
                currentFilterChanged: '&?poiFilterChanged'
            },
            link: function (scope, elements, attributes) {
                scope.filters = [];
                angular.forEach(config_poi, function (value, key) {
                    scope.filters.push(value);
                });
                scope.selectedFilters = [];
                scope.selectFilter = function (filter) {
                    $rootScope.array_toggle(scope.selectedFilters, filter.type);
                }
                scope.isSelected = function (filter) {
                    return scope.selectedFilters.indexOf(filter.type) > -1;
                }

                scope.validateFilters = function () {

                    if (scope.currentFilterChanged)
                        scope.currentFilterChanged({filters: scope.selectedFilters});


                }
            }
        }
    })
    ;
})();