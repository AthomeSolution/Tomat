'use strict';

angular.module('EcreateIonic')
  .factory('mapmarkers', function ($q, $http, template, config_poi) {
    return {
      getOptions: function () {
        return {
          center: {
            latitude: 46.9923442,
            longitude: 3.1814479
          },
          zoom: 8,
          options: {
            scrollwheel: false
          }
        };
      },
      createMarkers: function (data) {
        var deferred = $q.defer();

        if (data.length <= 0) {
          deferred.resolve([]);
          return deferred.promise;
        }

        var markers = [];
        var type = data[0].type;
        var templateUrl = config_poi[type].map.popupTemplateUrl;
        $http.get(templateUrl).then(
          function (response) {
            for (var index in data) {
              var item = data[index];
              if (typeof(item) !== 'object') continue;

              if (parseFloat(item.lat) + parseFloat(item.lng) == 0) continue;
              var icon = "";
              var markerColor = "";
              if (config_poi[item.type]) {
                icon = config_poi[item.type].map.markerIcon.toUpperCase().replace('-', '_');
                markerColor = config_poi[item.type].map.markerColor;
              }

              var marker = {
                id: item.id,
                item: item,
                message: '',
                coords: {
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lng)
                },
                icon: {
                  path: fontawesome.markers[icon],
                  anchor: new google.maps.Point(32, -32),
                  scale: 0.5,
                  strokeWeight: 0.2,
                  strokeColor: 'black',
                  strokeOpacity: 1,
                  fillColor: markerColor,
                  fillOpacity: 1
                },
                focus: false,
                draggable: false
              };
              markers.push(marker);

              template.getTemplate(response.data, {item: item}, {index: index}).then(function (data) {
                if (markers[data.parameters.index])
                  markers[data.parameters.index].message = data.html;
              });
            }
            deferred.resolve(markers);
          }
        );

        return deferred.promise;
      },
      createWifiMarkers: function (data) {
        var markers = [];
        for (var index in data) {
          var item = data[index];
          if (typeof(item) !== 'object') continue;

          var marker = {
            id: item.id,
            item: item,
            message: item.name,
            coords: {
              latitude: parseFloat(item.lat),
              longitude: parseFloat(item.lng)
            },
            icon: {
              path: fontawesome.markers['SIGNAL'],
              anchor: new google.maps.Point(32, -32),
              scale: 0.5,
              strokeWeight: 0.2,
              strokeColor: 'black',
              strokeOpacity: 1,
              fillColor: 'blue',
              fillOpacity: 1
            }
          };
          markers.push(marker);
        }
        return markers;
      }
    }
  }
);
