(function () {
    'use strict';

    angular.module('EcreateIonic').directive('forecast', function (forecast) {
            return {
                restrict: 'E',
                template:   '<div class="weather row">' +
                            '   <div class="climacon {{ weather.icon }}" aria-hidden="true"></div>' +
                            '   <div class="info">' +
                            '       <span>{{ weather.summary }}</span>' +
                            '       <span>{{ weather.temperature | number:0 }} °C</span>' +
                            '   </div>' +
                            '</div>',
                replace: true,
                scope: {
                    lat: "=",
                    lon: "="
                },
                link: function (scope, elements, attributes) {
                    forecast.getWeather(scope.lat, scope.lon, function(response) {
                        scope.weather = response;
                    });
                }
            }
        }
    );
})();