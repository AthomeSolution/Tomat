'use strict';

angular.module('EcreateIonic.controllers.main', [])
    .controller('MainCtrl', function ($scope, $rootScope, $ionicScrollDelegate, config, $ionicPopup, localize, baasboxLogin) {
        if ($scope.language == null)
            $scope.language = config.locale;
        $scope.languages = config.locales;

        $scope.error = baasboxLogin;

        $scope.translate = function () {
            $ionicPopup.show({
                templateUrl: 'templates/translate-popup.html',
                title: localize.getLocalizedString('LANGUAGES'),
                scope: $scope,
                buttons: [
                    { text: localize.getLocalizedString('OK'), onTap: function (e) {
                        return true;
                    }}
                ]
            }).then(function (res) {
                }, function (err) {
                }, function (popup) {
                });
        };
        $scope.changeLanguage = function (lang) {
            $scope.language = lang;
            localize.language = lang;
            localize.initLocalizedResources();
        }
    });

