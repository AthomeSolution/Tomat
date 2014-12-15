(function () {
  'use strict';

  angular.module('EcreateIonic')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app', {
          url: '',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'MainCtrl',
          resolve: {
            baasboxLogin: ['baasbox', 'persist', 'db', '$q', function (baasbox, persist, db, $q) {
              var deferred = $q.defer();
              var storedPromise = persist.stored();

              function errorCb() {
                deferred.resolve({code: 1, msg: 'Failed to login. Please check your connection'})
              }

              storedPromise.then(
                function (res) {
                  if (!res)
                    return baasbox.login('admin', 'admin', null, errorCb).then(function () {
                      if (db != null)
                        persist.refresh().then(deferred.resolve({code: 0, msg: 'Sync done'}));
                      else
                        deferred.resolve({code: 1, msg: 'No local storage'})
                    });
                  else
                    return deferred.resolve({code: 0, msg: 'Already done'})
                });
              return deferred.promise;
            }]
          }
        })
        .state('app.home', {
          url: '/',
          views: {
            'menuContent': {
              templateUrl: 'templates/home.html',
              controller: 'MainCtrl'
            }
          }
        })
        .state('app.login', {
          url: '/login',
          views: {
            'menuContent': {
              templateUrl: 'templates/login.html',
              controller: 'AuthCtrl'
            }
          }
        })
        .state('app.register', {
          url: '/register',
          views: {
            'menuContent': {
              templateUrl: 'templates/register.html',
              controller: 'AuthCtrl'
            }
          }
        })
        .state('app.account', {
          url: '/account',
          views: {
            'menuContent': {
              templateUrl: 'templates/account.html',
              controller: 'AuthCtrl'
            }
          },
          secured: true
        })
        .state('app.reset', {
          url: '/reset',
          views: {
            'menuContent': {
              templateUrl: 'templates/reset.html',
              controller: 'ResetCtrl'
            }
          }
        })
        .state('app.pois', {
          url: '/pois/:filter',
          views: {
            'menuContent': {
              templateUrl: 'templates/poi/list.html',
              controller: 'PoiListCtrl'
            }
          }
        })
        .state('app.favorites', {
          url: '/favorites/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/poi/favorites.html',
              controller: 'PoiFavoritesCtrl'
            }
          },
          secured: true
        })
        .state('app.poi', {
          url: '/poi/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/poi/show.html',
              controller: 'PoiShowCtrl'
            }
          }
        })
        .state('app.events', {
          url: '/events',
          views: {
            'menuContent': {
              templateUrl: 'templates/events/list.html',
              controller: 'EventsListCtrl'
            }
          }
        }).state('app.event', {
          url: '/events/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/events/show.html',
              controller: 'EventsShowCtrl'
            }
          }
        })
        .state('app.wifi', {
          url: '/wifi',
          views: {
            'menuContent': {
              templateUrl: 'templates/poi/maponly.html',
              controller: 'WifiListCtrl' // FIXME merge PoiListCtrl
            }
          }
        })
        .state('app.discover', {
          url: '/discover/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/discover/show.html',
              controller: 'DiscoverShowCtrl'
            }
          }
        })
        .state('app.ugc', {
          url: '/ugc/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/poi/ugc.html',
              controller: 'UgcCtrl'
            }
          },
          secured: true
        })
        .state('app.ugcedit', {
          url: '/ugcedit/:id',
          views: {
            'menuContent': {
              templateUrl: 'templates/poi/ugc_edit.html',
              controller: 'UgcCtrl'
            }
          },
          secured: true
        }).state('app.ugclist', {
          url: '/ugclist',
          views: {
            'menuContent': {
              templateUrl: 'templates/poi/ugc_list.html',
              controller: 'UgcCtrl'
            }
          },
          secured: true
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');
    });
})();
