(function () {
    'use strict';

    angular.module('EcreateIonic').directive('filterSelector', function($rootScope, $location, $ionicActionSheet, $ionicSlideBoxDelegate, localize, config_poi) {
        return {
            restrict: 'E',
            templateUrl: 'templates/filter_selector.html',
            replace: true,
            scope: {
                filterTypes: '=',
                currentType: '=',
                currentTypeChanged: '&'
            },
            link: function(scope, elements, attributes) {
                scope.currentIndex = 0;
                scope.currentType = scope.filterTypes[scope.currentIndex];
                scope.count = scope.filterTypes.length;

                scope.next = function() {
                    $ionicSlideBoxDelegate.slide($ionicSlideBoxDelegate.currentIndex()+1);
                    scope.onFilterChanged($ionicSlideBoxDelegate.currentIndex());
                };

                scope.previous = function() {
                    $ionicSlideBoxDelegate.slide($ionicSlideBoxDelegate.currentIndex()-1);
                    scope.onFilterChanged($ionicSlideBoxDelegate.currentIndex());
                };

                scope.onFilterChanged = function(index) {
                    scope.currentType = scope.filterTypes[index];
                    scope.currentIndex = index;
                    if (scope.currentTypeChanged != null)
                        scope.currentTypeChanged({type: scope.currentType});
                };

                scope.showFilters = function() {
                    $ionicActionSheet.show({
                        buttons: scope.filterTypes.map(function(item) { return { text: localize.getLocalizedString(item.text) };  }),
                        cancelText: 'Cancel',
                        buttonClicked: function(index) {
                            $ionicSlideBoxDelegate.slide(index);
                            scope.onFilterChanged(index);
                            return true;
                        }
                    });
                };
            }
        }
    })
    ;
})();