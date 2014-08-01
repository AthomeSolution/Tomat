'use strict';

angular.module('backendInterfaceApp')
    .factory('baasbox', function ($http, $resource, config, $q) {
        function initData(self) {
            console.log('Checking data...');
            $http.get(config.url + '/admin/collection').then(function (response) {
                if (response.data.data.length == 0) {
                    console.log('Initializing data...');
                    self.createCollection('contents').then(function () {
                        self.createNewDocument('contents', {
                            name: 'Qui sommes nous ?',
                            content: '\n\nEt interdum acciderat, ut siquid in penetrali secreto nullo citerioris vitae ministro praesente paterfamilias uxori susurrasset in aurem, velut Amphiarao referente aut Marcio, quondam vatibus inclitis, postridie disceret imperator. ideoque etiam parietes arcanorum soli conscii timebantur.'
                        });
                    });
                    self.createCollection('datas').then(function () {
                        self.createNewDocument('datas', {
                            name: 'menu',
                            data: [
                                {
                                    label: 'Bienvenue',
                                    color: '#2075b8',
                                    bordercolor: '#ffffff',
                                    links: [
                                        {
                                            label: 'Qui somme nous ?',
                                            uri: '#/discover/b218676b-d68c-477c-ad82-5732aad114d8',
                                            icon: 'fa fa-home',
                                            visible: true,
                                            showhome: true,
                                            cls: ''
                                        }
                                    ]
                                },
                                {
                                    label: 'Séjourner',
                                    color: '#e04246',
                                    bordercolor: '#f69698',
                                    links: [
                                        {
                                            label: 'Hôtels',
                                            uri: '#/pois/hotel',
                                            icon: 'fa fa-building-o',
                                            showhome: true,
                                            visible: true,
                                            cls: ''
                                        },
                                        {
                                            label: 'Restaurants',
                                            uri: '#/pois/restaurant',
                                            icon: 'fa fa-cutlery',
                                            showhome: true,
                                            visible: true,
                                            cls: ''
                                        },
                                        {
                                            label: 'Événements',
                                            uri: '#/pois/events',
                                            icon: 'fa fa-calendar',
                                            showhome: true,
                                            visible: true,
                                            cls: ''
                                        }
                                    ]
                                },
                                {
                                    label: 'Mes favoris',
                                    color: '#d6b641',
                                    bordercolor: '#f7e296',
                                    links: [
                                        {
                                            label: 'Tous mes favoris',
                                            uri: '#/favorites/all',
                                            icon: 'fa fa-heart-o',
                                            showhome: true,
                                            visible: true,
                                            cls: ''
                                        }
                                    ]
                                },
                                {
                                    label: 'Paramètres',
                                    color: '#18916d',
                                    bordercolor: '#7ed7bd',
                                    links: [
                                        {
                                            label: 'Mon compte',
                                            uri: '#/account',
                                            icon: 'fa fa-user',
                                            showhome: true,
                                            visible: true,
                                            cls: ''
                                        },
                                        {
                                            label: 'Initialiser',
                                            uri: '#/reset',
                                            icon: 'fa fa-undo',
                                            showhome: true,
                                            visible: true,
                                            cls: ''
                                        }
                                    ]
                                }
                            ],
                            type: 'menu'
                        });
                    });
                    self.createCollection('datasources');
                    self.createCollection('datatypes').then(function () {
                        self.createNewDocument('datatypes', {
                            "name": "events",
                            "structure": [
                                {
                                    "name": "Name",
                                    "path": "name",
                                    "type": "text"
                                },
                                {
                                    "name": "Longitude",
                                    "path": "lng",
                                    "type": "text"
                                },
                                {
                                    "name": "Latitude",
                                    "path": "lat",
                                    "type": "text"
                                },
                                {
                                    "name": "Image",
                                    "path": "img",
                                    "type": "text"
                                },
                                {
                                    "name": "Description",
                                    "path": "description",
                                    "type": "text"
                                },
                                {
                                    "name": "Date",
                                    "path": "date",
                                    "type": "date"
                                },
                                {
                                    "name": "Category",
                                    "path": "category",
                                    "type": "text"
                                },
                                {
                                    "name": "Identifier",
                                    "path": "uniqueId",
                                    "type": "text"
                                },
                                {
                                    "name": "Publication End",
                                    "path": "endPublication",
                                    "type": "date"
                                },
                                {
                                    "name": "StartDate",
                                    "path": "startDate",
                                    "type": "date"
                                },
                                {
                                    "name": "EndDate",
                                    "path": "endDate",
                                    "type": "date"
                                },
                                {
                                    "name": "Price",
                                    "path": "price",
                                    "type": "text"
                                }
                            ],
                            "templatePath": "templates/events"
                        });
                        self.createNewDocument('datatypes', {
                            "name": "hotel",
                            "structure": [
                                {
                                    "name": "Name",
                                    "path": "name",
                                    "type": "text"
                                },
                                {
                                    "name": "Description",
                                    "path": "description",
                                    "type": "text"
                                },
                                {
                                    "name": "Image",
                                    "path": "img",
                                    "type": "text"
                                },
                                {
                                    "name": "Longitude",
                                    "path": "lng",
                                    "type": "number"
                                },
                                {
                                    "name": "Latitude",
                                    "path": "lat",
                                    "type": "number"
                                },
                                {
                                    "name": "PublicationDate",
                                    "path": "date",
                                    "type": "date"
                                },
                                {
                                    "name": "Identifier",
                                    "path": "uniqueId",
                                    "type": "text"
                                },
                                {
                                    "name": "Capacity",
                                    "path": "capacity",
                                    "type": "text"
                                },
                                {
                                    "name": "Rooms",
                                    "path": "rooms",
                                    "type": "text"
                                },
                                {
                                    "name": "PriceNight",
                                    "path": "priceNight",
                                    "type": "text"
                                },
                                {
                                    "name": "PriceWeekend",
                                    "path": "priceWeekend",
                                    "type": "text"
                                },
                                {
                                    "name": "PriceWeek",
                                    "path": "priceWeek",
                                    "type": "text"
                                },
                                {
                                    "name": "ContactCivility",
                                    "path": "contactCivility",
                                    "type": "text"
                                },
                                {
                                    "name": "ContactFirstName",
                                    "path": "contactFirstName",
                                    "type": "text"
                                },
                                {
                                    "name": "ContactLastName",
                                    "path": "contactLastName",
                                    "type": "text"
                                },
                                {
                                    "name": "ContactTel",
                                    "path": "contactTel",
                                    "type": "text"
                                },
                                {
                                    "name": "ContactMail",
                                    "path": "contactMail",
                                    "type": "number"
                                }
                            ],
                            "templatePath": "templates/hotel"
                        });
                        self.createNewDocument('datatypes', {
                            "name": "restaurant",
                            "structure": [
                                {
                                    "name": "Name",
                                    "path": "name",
                                    "type": "text"
                                },
                                {
                                    "name": "Description",
                                    "path": "description",
                                    "type": "text"
                                },
                                {
                                    "name": "Image",
                                    "path": "img",
                                    "type": "text"
                                },
                                {
                                    "name": "Longitude",
                                    "path": "lng",
                                    "type": "number"
                                },
                                {
                                    "name": "Latitude",
                                    "path": "lat",
                                    "type": "number"
                                },
                                {
                                    "name": "PublicationDate",
                                    "path": "date",
                                    "type": "date"
                                },
                                {
                                    "name": "Identifier",
                                    "path": "uniqueId",
                                    "type": "text"
                                },
                                {
                                    "name": "PriceMenu",
                                    "path": "priceMenu",
                                    "type": "text"
                                },
                                {
                                    "name": "NumberFlatware",
                                    "path": "numberFlatware",
                                    "type": "text"
                                },
                                {
                                    "name": "ContactCivility",
                                    "type": "text",
                                    "path": "contactCivility"
                                },
                                {
                                    "name": "ContactFirstName",
                                    "type": "text",
                                    "path": "contactFirstName"
                                },
                                {
                                    "name": "ContactLastName",
                                    "type": "text",
                                    "path": "contactLastName"
                                },
                                {
                                    "name": "ContactTel",
                                    "type": "text",
                                    "path": "contactTel"
                                },
                                {
                                    "name": "ContactMail",
                                    "type": "text",
                                    "path": "contactMail"
                                }
                            ],
                            "templatePath": "templates/restaurants"
                        });
                    });
                    self.createCollection('poi');
                }
            });
        }

        return {
            login: function (userName, password, success, error) {
                var transform = function (data) {
                    return $.param(data);
                };
                var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transform };
                var data = {username: userName, password: password, appcode: config.appcode};
                var self = this;
                $http.post(config.url + '/login', data, headers).then(
                    function (response) {
                        if (response.data.result == "ok") {
                            var token = response.data.data['X-BB-SESSION'];
                            $http.defaults.headers.common = { "X-BB-SESSION": token };
                            initData(self);
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
            uploadasset: function () {
                var promise = upload({
                    url: '/admin/asset',
                    method: 'POST',
                    data: {
                        name: name// a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
                    }
                });
                return promise;
            },
            convert: function (datas, file) {
                var fd = new FormData();
                if (file)
                    fd.append('file', file);
                fd.append('config', angular.toJson(datas));
                var promise = $http.post(config.url + '/convertData', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function (response) {
                    return response.data.data;
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
            createOrUpdateDocument: function (collection, document) {
                if (document.id) {
                    return this.updateDocument(collection, document.id, document);
                } else {
                    return this.createNewDocument(collection, document);
                }
            },
            createNewDocument: function (collection, document) {
                var deferred = $q.defer();
                $http.post(config.url + '/document/' + collection, document).then(function (response) {
                    $http.put(config.url + '/document/' + collection + '/' + response.data.id + "/read/role/registered").then(function (registerResponse) {
                        $http.get(config.url + '/document/' + collection + '/' + uniqueId).then(function (finalResponse) {
                            deferred.resolve(finalResponse.data);
                        })
                    });
                });
                return deferred.promise;
            },
            listDocuments: function (collection, query) {
                var url = config.url + '/document/' + collection;
                var params = {};
                if (query) {
                    params.params = {where: query};
                }
                var promise = $http.get(url, params).then(function (response) {
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
                var deferred = $q.defer();
                var url = config.url + '/document/' + collection + "/" + uniqueId;
                var promise = $http.put(url, document).then(function (response) {
                    $http.put(config.url + '/document/' + collection + '/' + uniqueId + "/read/role/registered").then(function (registerResponse) {
                        $http.get(config.url + '/document/' + collection + '/' + uniqueId).then(function (finalResponse) {
                            deferred.resolve(finalResponse.data);
                        })
                    });
                });
                return deferred.promise;
            },
            updateSingleField: function (collection, uniqueId, fieldname, newValue) {
                var url = config.url + '/document/' + collection + "/" + uniqueId + "/." + fieldname;
                var promise = $http.put(url, {data: newValue}).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            deleteDocument: function (collection, uniqueId) {
                var url = config.url + '/document/' + collection + '/' + uniqueId;
                var promise = $http['delete'](url);
                return promise;
            },
            createCollection: function (name) {
                console.log('Creating collection: ' + name);
                return $http.post(config.url + '/admin/collection/' + name);
            }
        }
    });
