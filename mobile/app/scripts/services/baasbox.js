(function() {
  'use strict';
  angular.module('EcreateIonic').factory('baasbox', function($rootScope, $http, config) {
    return {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-BAASBOX-APPCODE': config.appcode
      },
      loggedIn: false,
      logged_username: null,
      request: function(method, url, params, data) {
        var head;
        head = {
          method: method,
          url: url,
          params: params,
          headers: this.headers,
          data: data
        };
        return $http(head).error(function(response) {
          return console.log('BAASBOX error: ' + response.message);
        }).then(function(response) {
          return response.data.data;
        });
      },
      login: function(username, password, successCallback, errorCallback) {
        var data, headers, self;
        self = this;
        headers = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          transformRequest: function(data) {
            return $.param(data);
          }
        };
        data = {
          username: username,
          password: password,
          appcode: config.appcode
        };
        return $http.post(config.url + '/login', data, headers).success(function(response) {
          self.headers['X-BB-SESSION'] = response.data['X-BB-SESSION'];
          console.log('BAASBOX login: Client authenticated');
          self.loggedIn = true;
          self.logged_username = username;
          $rootScope.logged_username = username;
          $rootScope.saveUserDatas(response.data.visibleByTheUser);
          if (successCallback) {
            return successCallback();
          }
        }).error(function(response) {
          if (response.message != null) {
            console.log('BAASBOX error: ' + response.message);
          } else {
            console.log('BAASBOX error: Server unreachable');
          }
          self.loggedIn = false;
          self.logged_username = null;
          $rootScope.logged_username = null;
          if (errorCallback) {
            return errorCallback(response.message);
          }
        });
      },
      register: function(username, password, params, successCallback, errorCallback) {
        var data, headers, self;
        self = this;
        headers = {
          headers: this.headers
        };
        data = {
          username: username,
          password: password,
          visibleByTheUser: params
        };
        return $http.post(config.url + '/user', data, headers).success(function(response) {
          self.headers['X-BB-SESSION'] = response.data['X-BB-SESSION'];
          console.log('BAASBOX login: Client registered');
          self.loggedIn = true;
          self.logged_username = username;
          $rootScope.logged_username = username;
          if (successCallback) {
            return successCallback();
          }
        }).error(function(response) {
          self.loggedIn = false;
          self.logged_username = null;
          $rootScope.logged_username = null;
          return errorCallback(response.message);
        });
      },
      update: function(params) {
        var data;
        data = {
          "visibleByTheUser": params
        };
        return this.request('PUT', config.url + "/me", "", data);
      },
      grantRights: function(collection, documentId) {
        var url;
        url = config.url + '/document/' + collection + '/' + documentId + "/read/role/registered";
        return this.request('PUT', url);
      },
      removeRight: function(collection, documentId) {
        var url;
        url = config.url + '/document/' + collection + '/' + documentId + "/read/role/registered";
        return this.request('DELETE', url);
      },
      getProfile: function(username) {
        var url;
        url = config.url + '/user/' + username;
        return this.request('GET', url);
      },
      setProfile: function(username, data) {
        var url;
        url = config.url + '/me';
        return this.request('PUT', url, null, data);
      },
      resetPassword: function(username) {
        var url;
        url = config.url + '/user/' + username + '/password/reset';
        return this.request('GET', url);
      },
      getDocument: function(collection, uniqueId) {
        var url;
        url = config.url + '/document/' + collection + "/" + uniqueId;
        return this.request('GET', url);
      },
      listDocuments: function(collection, query, params) {
        var args, url;
        url = config.url + '/document/' + collection;
        args = query != null ? {
          where: query,
          params: params
        } : null;
        return this.request('GET', url, args);
      },
      createDocument: function(collection, document) {
        var url;
        url = config.url + "/document/" + collection;
        return this.request('POST', url, "", document);
      },
      updateDocument: function(collection, uniqueId, document) {
        var url;
        url = config.url + '/document/' + collection + "/" + uniqueId;
        return this.request('PUT', url, "", document);
      },
      createOrUpdate: function(collection, document) {
        if (document.id) {
          return this.updateDocument(collection, document.id, document);
        } else {
          return this.createDocument(collection, document);
        }
      }
    };
  });

}).call(this);
