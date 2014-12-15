(function () {
  'use strict';

  angular.module('EcreateIonic').directive('poiItem', function (config_poi) {
    return {
      restrict: 'E',
      template: '<div ng-include="getTemplate()"></div>',
      replace: true,
      link: function (scope, el, attrs) {
        scope.getTemplate = function () {
          if (attrs.favorite)
            return 'templates/hotel/favorite-item.html';

          var conf = config_poi[scope.filter.type];
          if (conf) {
            return config_poi[scope.filter.type].listItem.templateUrl;
          } else {
            return 'templates/hotel/item.html';
          }
        }
      }
    }
  });
})();
