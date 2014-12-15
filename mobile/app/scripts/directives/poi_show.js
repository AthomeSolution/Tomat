(function () {
  'use strict';

  angular.module('EcreateIonic').directive('poiShow', function (config_poi, mapmarkers, $http, $compile) {
    return {
      restrict: 'E',
      //template: '<div ng-include="getTemplate()"></div>',
      replace: true,
      scope: {
        item: '='
      },
      link: function (scope, element, attributes) {
        scope.$watch('item', function (item) {
            if (scope.item == undefined) return;
            scope.mapOptions = mapmarkers.getOptions();
            scope.mapOptions.zoom = 12;

            $http.get(config_poi[scope.item.type].item.templateUrl).success(
              function (response) {
                var icon = config_poi[scope.item.type].map.markerIcon.toUpperCase().replace('-', '_');
                scope.markers = [
                  {
                    id: 'id',
                    coords: {
                      latitude: parseFloat(scope.item.lat),
                      longitude: parseFloat(scope.item.lng)
                    },
                    icon: {
                      path: fontawesome.markers[icon],
                      anchor: new google.maps.Point(32, -32),
                      scale: 0.5,
                      strokeWeight: 0.2,
                      strokeColor: 'black',
                      strokeOpacity: 1,
                      fillColor: config_poi[scope.item.type].map.markerColor,
                      fillOpacity: 1
                    }
                  }
                ];

                element.html(response);
                $compile(element.contents())(scope);
              }
            );
          }
        );
      }
    }
  });
})();
