'use strict';
angular.module('EcreateIonic.controllers.poi.show', [])
  .controller('PoiShowCtrl', function ($scope, $window, $stateParams, $ionicPopup, config_poi, persist, socialsharing, localize) {
    $scope.id = $stateParams.id;

    persist.get('poi', $stateParams.id).then(function (data) {
      if (data.fields) {
        for (var j = 0; j < data.fields.length; j++) {
          var field = data.fields[j];
          if (field.type === "date") {
            data[field.path] = new Date(data[field.path].replace(' ', 'T'));
          }
        }
      }

      $scope.poi = data;
    });

    $scope.types = [];
    angular.forEach(config_poi, function (value, key) {
      $scope.types.push(value);
    });

    $scope.share = function () {
      $ionicPopup.show({
        templateUrl: 'templates/poi/popup-share.html',
        title: localize.getLocalizedString('Share'),
        scope: $scope,
        buttons: [
          { text: localize.getLocalizedString('Close'), onTap: function (e) {
            return true;
          }}
        ]
      }).then(function (res) {
      }, function (err) {
      }, function (popup) {
        $scope.popup = popup;
      });
    };

    $scope.useCordova = socialsharing.useCordova;

    $scope.facebookShare = function () {
      socialsharing.facebookSharePoi($scope.poi);
      //$scope.popup.close();
    };

    $scope.twitterShare = function () {
      socialsharing.twitterSharePoi($scope.poi);
      //$scope.popup.close();
    };

    $scope.emailShare = function () {
      socialsharing.emailSharePoi($scope.poi);
      //$scope.popup.close();
    };

    $scope.smsShare = function () {
      socialsharing.smsSharePoi($scope.poi);
      //$scope.popup.close();
    };

    $scope.pinterestShare = function () {
      socialsharing.pinterestSharePoi($scope.poi);
      //$scope.popup.close();
    };

    $scope.instagramShare = function () {
      socialsharing.instagramSharePoi($scope.poi);
      //$scope.popup.close();
    };

    $scope.contact = function () {
      var conf = config_poi[$scope.poi.type];
      if (conf) {
        for (var index in conf.contact.fields) {
          var field = conf.contact.fields[index];
          if ($scope.poi[field]) {
            window.location.href = 'tel:' + $scope.poi[field].replace(/ /g, "");
          }
        }
      }
    };

    $scope.searchAround = function () {
      $ionicPopup.show({
        templateUrl: 'templates/poi/popup-search-around.html',
        title: 'Search around',
        scope: $scope,
        buttons: [
          { text: 'Close', onTap: function (e) {
            return true;
          }}
        ]
      }).then(function (res) {
      }, function (err) {
      }, function (popup) {
      });
    };
  });
