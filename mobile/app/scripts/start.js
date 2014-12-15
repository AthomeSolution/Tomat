(function () {
  'use strict';

  angular.module('EcreateIonic')
    .run(function ($rootScope, $state, $window, $location, config, localize, baasbox, persist, $ionicLoading) {
      $rootScope.logged_username = "";

      $rootScope.loadingIndicator = $ionicLoading.show({
        template: 'Bienvenue. Chargement en cours… Le 1er lancement prend quelques minutes pour permettre ensuite l\'utilisation en mode déconnecté.',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 500,
        showDelay: 500
      });

      $rootScope.done = function () {
        ImgCache.options.usePersistentCache = true;
//        ImgCache.options.debug = true;
        if (!!window.cordova) {
          document.addEventListener('deviceready', function () {
            console.log('IMGCACHE init');
            ImgCache.init(function () {
              persist.cacheImages().then(function () {
                $ionicLoading.hide();
              }, function () {
                console.log('IMGCACHE init - Failed to init cache');
              });
            });
          }, false);
        } else {
          ImgCache.init();
          $ionicLoading.hide();
        }
      };

      $rootScope.toggleMenu = function () {
        var $content = $('.menu-content.menu3d');
        if ($content.hasClass('inactive')) {
          $content.removeClass('inactive');
        } else {
          $content.addClass('inactive');
        }
      };

      $rootScope.closeMenu = function () {
        $('.menu-content.menu3d').removeClass('inactive');
      };

      $rootScope.userData = {
        favorites: []
      };

      $rootScope.saveUserDatas = function (datas) {
        for (var key in datas) {
          $rootScope.userData[key] = datas[key];
        }
      };

      $rootScope.favorites = [
        {id: 1, name: 'My log book', pois: {
          1: "Mon favori", fdsqf: "Un autre"
        }},
        {id: 2, name: "My summer holidays", pois: {}}
      ];

      $rootScope.getBooks = function (indexedPoi) {
        var result = [];
        if (!$rootScope.userData.favorites)
          return result;
        for (var i = 0; i < $rootScope.userData.favorites.length; i++) {
          var book = $rootScope.userData.favorites[i];
          if (book.pois[indexedPoi.id]) {
            result.push(book);
          }
        }
        return result;
      };

      $rootScope.bookContains = function (favorite, indexedPoi) {
        return indexedPoi.id in favorite.pois;
      };

      $rootScope.removeFav = function (favorite, indexedPoi) {
        delete favorite.pois[indexedPoi.id];
        indexedPoi.hasFavorite = $rootScope.getBooks(indexedPoi);
      };

      $rootScope.addFav = function (favorite, indexedPoi, comment) {
        if (comment)
          favorite.pois[indexedPoi.id] = comment;
        else
          favorite.pois[indexedPoi.id] = " ";
        indexedPoi.hasFavorite = true;
      };

      $rootScope.placeTypes = [
        {id: 'ALL', text: "La canal du Nivernais"},
        {id: 'VINEYARD', text: "Escale Vignoble (vineyard)"},
        {id: 'VILLAGES', text: "Escale Village (villages)"},
        {id: 'FLOATING', text: "Escale Flottage (floating)"},
        {id: 'COUNTRYSIDE', text: "Escale Nature (countryside)"},
        {id: 'CONFLUENCE', text: "Escale Confluence (confluence)"}
      ];

      if (config.locale)
        localize.language = config.locale;
      else {
        localize.language = $window.navigator.userLanguage || $window.navigator.language;
        if (localize.language.length == 2) {
          localize.language = localize.language + '-' + localize.language.toUpperCase();
        }
      }

      $rootScope.array_remove = function (arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
          what = a[--L];
          while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
          }
        }
        return arr;
      };

      $rootScope.array_toggle = function (array, item) {
        if (array.indexOf(item) > -1) {
          $rootScope.array_remove(array, item);
        } else {
          array.push(item);
        }
        return array;
      };

      $rootScope.onFavoriteChanged = function (data) {
        //alert('TODO: save favorite');
        baasbox.update($rootScope.userData);
        //TODO : SAVE FAVORITES
        /*baasbox.updateSingleField('poi', data.item.id, 'favorite', data.item.favorite).then(function (result) {
         console.log('favorite saved : '+ data.item.id);
         });*/
      };

      $rootScope.back = function () {
        $window.history.back();
      };

//      ionic.Platform.ready(function () {
//        var appID = config.facebookAppId;
//        var device = ionic.Platform.device();
//        try {
//          if (device && device.model) {
//            console.log("doing Native fb init");
//            FB.init({ appId: appID, nativeInterface: CDV.FB, useCachedDialogs: false, status: true });
//          } else {
//            console.log("doing non-native fb init");
//            FB.init({ appId: appID, status: true});
//          }
//        } catch (e) {
//          console.log("fb init error" + e);
//        }
//      });

      $rootScope.$on('$stateChangeStart', function (e, next, nextParam) {
        var username = baasbox.logged_username;
        if (next.secured && (username == null || username == "" || username == "admin")) {
          $location.path('/login').search({url: $state.href(next, nextParam).substr(1)});
        }
      });

      function listenPush() {
        var pushNotification = window.plugins.pushNotification;

        function GCMSuccess(result) {
          console.log("PUSH listening: " + result);
        }

        function GCMError(err) {
          console.log("PUSH ERROR: " + err);
        }

        $window.onNotificationGCM = function (e) {
          switch (e.event) {
            case 'registered':
              if (e.regid.length > 0) {
                console.log("PUSH registered: " + e.regid);
              }
              break;
            case 'message':
              console.log('PUSH message(' + e.msgcnt + '): ' + e.message);
              break;
            case 'error':
              console.log('PUSH ERROR: ' + e.msg);
              break;
            default:
              console.log('An unknown GCM event has occurred');
              break;
          }
        };
        pushNotification.register(GCMSuccess, GCMError, {
          "senderID": "AIzaSyDpL8Z-GOepBxtK5pslWFjDvARa0fct48k",
          "ecb": "onNotificationGCM"
        });
      }

      document.addEventListener("deviceready", listenPush, false);

      function onBackButton(e) {
        if (document.getElementById('#homepage')) {
          e.preventDefault();
          navigator.app.exitApp();
        } else {
          navigator.app.backHistory();
        }
      }

      document.addEventListener('backbutton', onBackButton, true);
    })
  ;
})();
