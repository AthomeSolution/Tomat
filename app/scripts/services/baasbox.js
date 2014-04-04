'use strict';

angular.module('backendInterfaceApp')
    .factory('baasbox', function ($http, $resource, config) {
        return {
            login: function (userName, password, success, error) {
                var transform = function (data) {
                    return $.param(data);
                }
                var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transform };
                var data = {username: userName, password: password, appcode: config.appcode};
                $http.post(config.url + '/login', data, headers).then(
                    function (response) {
                        if (response.data.result == "ok") {
                            var token = response.data.data['X-BB-SESSION'];
                            $http.defaults.headers.common = { "X-BB-SESSION": token };
                            if (success) success(response.data.data);
                        }
                        if (error) error("Unknwon error");
                    },
                    function (response) {
                        if (error) {
                            if (response.data.result == "error") {
                                error(response.data.message);
                            } else {
                                error("Unknwon error");
                            }
                        }
                    }
                );
            },
            uploadasset: function(){
               var promise =  upload({
                    url: '/admin/asset',
                    method:'POST',
                    data: {
                        name:name// a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
                    }
                });
                return promise;
            },
            register: function (userName, password, email, success, error) {
                var data = {username: userName, password: password, visibleByTheUser: {email: email}};
                $http.post(config.url + '/user', data).then(
                    function (response) {
                        if (response.data.result == "ok") {
                            var token = response.data.data['X-BB-SESSION'];
                            $http.defaults.headers.common = { "X-BB-SESSION": token };
                            if (success) success(response.data.data);
                        }
                        if (error) error("Unknwon error");
                    },
                    function (response) {
                        if (error) {
                            if (response.data.result == "error") {
                                error(response.data.message);
                            } else {
                                error("Unknwon error");
                            }
                        }
                    }
                );
            },
            resetPassword: function (login) {
                var promise = $http.get(config.url + '/user/' + login + '/password/reset').then(function (response) {
                    return response.data;
                });
                return promise;
            },
            setToken: function (token) {
                $http.defaults.headers.common["X-BB-SESSION"] = token;
            },
            setAppCode: function () {
                $http.defaults.headers.common["X-BAASBOX-APPCODE"] = config.appcode;
            },
            createNewDocument: function (collection, document) {
                var promise = $http.post(config.url + '/document/' + collection, document).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            listDocuments: function (collection,query) {
                var url = config.url + '/document/' + collection;
                var params ={};
                if(query){
                    params.params = {where : query};
                }
                var promise = $http.get(url,params).then(function (response) {
                    if (response.data.result == "ok") {
                        return response.data.data;
                    }
                });
                return promise;
            },
            getDocument: function (collection, uniqueId) {
                var url = config.url + '/document/' + collection + "/" + uniqueId;
                var promise = $http.get(url).then(function (response) {
                    if (response.data.result == "ok") {
                        return response.data.data;
                    }
                });
                return promise;
            },
            updateDocument: function (collection, uniqueId, document) {
                var url = config.url + '/document/' + collection + "/" + uniqueId;
                var promise = $http.put(url, document).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            updateSingleField: function (collection, uniqueId, fieldname, newValue) {
                var url = config.url + '/document/' + collection + "/" + uniqueId + "/." + fieldname;
                var promise = $http.put(url, {data: newValue}).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            deleteDocument: function (collection, uniqueId) {
                var url = config.url + '/document/' + collection + "/" + uniqueId;
                var promise = $http['delete'](url);
                return promise;
            }
        }
    });
