(function () {
    'use strict';

    angular.module('backendInterfaceApp')
        .factory('auth', function ($http, $cookieStore, baasbox) {
            return {
                isLoggedIn: function () {
                   return $cookieStore.get('user');
                },
                getToken: function() {
                    return $cookieStore.get('token');
                },
                login: function (login, password, success, error) {
                    baasbox.login(login, password, function(data) {
                        var token = data["X-BB-SESSION"];
                        $cookieStore.put('user', data.user);
                        $cookieStore.put('token', token);
                        if(success) success({token: token, user:data.user});
                    }, function(data) {
                        if(error) error(data);
                    });
                },
                logout: function (success) {
                    $cookieStore.remove('user');
                    $cookieStore.remove('token');
                    if(success) success();
                },
                register: function (login, password, email, success, error) {
                    baasbox.register(login, password, email, function(data) {
                        console.log(data);
                        var token = data["X-BB-SESSION"];
                        $cookieStore.put('user', data.user);
                        $cookieStore.put('token', token);
                        if(success) success({token: token, user:data.user});
                    }, function(data) {
                        if(error) error(data);
                    });
                },
                resetPassword: function(login) {
                    return baasbox.resetPassword(login);
                }
            };
        });
})();