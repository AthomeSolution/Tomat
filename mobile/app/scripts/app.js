'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('EcreateIonic',
  [
    'ionic',
    'EcreateIonic.controllers.main',
    'EcreateIonic.controllers.auth',
    'EcreateIonic.controllers.reset',
    'EcreateIonic.controllers.poi.list',
    'EcreateIonic.controllers.poi.favorites',
    'EcreateIonic.controllers.poi.show',
    'EcreateIonic.controllers.wifi',
    'EcreateIonic.controllers.ugc',
    'EcreateIonic.controllers.discover.show',
    'localization',
    'ezfb',
    'vr.directives.slider',
    'google-maps'
  ])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.hide();
      }
    });
  })
;
