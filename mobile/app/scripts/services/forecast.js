'use strict';

angular.module('EcreateIonic')
    .factory('forecast', function ($http, config) {
        return {
            getWeather: function (lat, lon, callback) {
                var url = config.url+'/forecast/' + lat + "/" + lon;

                $http.get(url).success(
                    function(response)
                    {
                        callback(response.currently);
                    }
                );
            }
        }
    });