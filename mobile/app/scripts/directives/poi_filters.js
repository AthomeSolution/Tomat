(function () {
  'use strict';

  angular.module('EcreateIonic').directive('poiFilters', function ($rootScope, $compile, config_poi) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        type: '=',
        cities: '=',
        currentFilterChanged: '&?poiFilterChanged'
      },
      link: function (scope, elements, attributes) {
        var filter = angular.element(document.createElement('poi-filters-' + scope.type));
        var el = $compile(filter)(scope);
        elements.append(filter);
      }
    }
  })
  ;
})();
