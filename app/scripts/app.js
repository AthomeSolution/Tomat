'use strict';

angular
    .module('backendInterfaceApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'leaflet-directive',
        'lr.upload'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main/:external', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                secured: true
            })
            .when('/', {
                templateUrl: 'views/mainmenu.html',
                controller: 'MainMenuCtrl',
                secured: true
            })
            .when('/createclientapplication', {
                templateUrl: 'views/createclientapplication.html',
                secured: true
            })
            .when('/configuredatatypes', {
                templateUrl: 'views/datatypes.html',
                controller: 'DatatypeCtrl'
            })
            .when('/configuremenu', {
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl'
            })
            .when('/configurecontent', {
                templateUrl: 'views/content.html',
                controller: 'ContentCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                secured: false
            })
            .when('/upload', {
                controller: 'UploadCtrl',
                secured: false
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function ($rootScope, $location, $http, auth, baasbox) {
        baasbox.setAppCode();
        if (auth.isLoggedIn()) {
            baasbox.setToken(auth.getToken());
        }

        $rootScope.$on("$routeChangeStart", function (event, next) {
            $rootScope.errors = null;
            var isLogged = auth.isLoggedIn();

            if (next.originalPath === '/login' && isLogged) {
                $location.path('/');
            } else if (next.secured && !isLogged) {
                $location.path('/login');
            }
        })
    });
