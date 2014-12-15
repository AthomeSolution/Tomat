'use strict'

angular.module 'EcreateIonic'
    .factory 'baasbox', ($rootScope, $http, config) ->
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-BAASBOX-APPCODE': config.appcode
        }
        loggedIn: false
        logged_username: null

        request: (method, url, params, data) ->
          head = {
            method: method,
            url: url,
            params: params,
            headers: @headers,
            data: data
          }
          $http head
          .error (response) ->
            console.log 'BAASBOX error: ' + response.message
          .then (response) ->
            response.data.data
        login: (username, password, successCallback, errorCallback) ->
          self = @
          headers = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: (data) ->
              $.param data
          }
          data = {username: username, password: password, appcode: config.appcode}
          $http.post config.url + '/login', data, headers
          .success (response) ->
            self.headers['X-BB-SESSION'] = response.data['X-BB-SESSION']
            console.log 'BAASBOX login: Client authenticated'
            self.loggedIn = true
            self.logged_username = username
            $rootScope.logged_username = username
            $rootScope.saveUserDatas response.data.visibleByTheUser
            successCallback() if successCallback
          .error (response) ->
            if response.message?
              console.log 'BAASBOX error: ' + response.message
            else
              console.log 'BAASBOX error: Server unreachable'
            self.loggedIn = false
            self.logged_username = null
            $rootScope.logged_username = null
            errorCallback(response.message) if errorCallback
        register: (username, password, params, successCallback, errorCallback) ->
          self = @
          headers = { headers: @headers }
          data = {
            username: username,
            password: password,
            visibleByTheUser: params
          }
          #@request 'POST', config.url + '/user', data
          $http.post config.url + '/user', data, headers
          .success (response) ->
            self.headers['X-BB-SESSION'] = response.data['X-BB-SESSION']
            console.log 'BAASBOX login: Client registered'
            self.loggedIn = true
            self.logged_username = username
            $rootScope.logged_username = username
            if successCallback
              successCallback()
          .error (response) ->
            self.loggedIn = false
            self.logged_username = null
            $rootScope.logged_username = null
            errorCallback response.message
        update: (params) ->
          data = { "visibleByTheUser": params }
          @request 'PUT', config.url + "/me", "", data
        grantRights: (collection, documentId) ->
          url = config.url + '/document/' + collection + '/' + documentId + "/read/role/registered";
          @request 'PUT', url
        removeRight: (collection, documentId) ->
          url = config.url + '/document/' + collection + '/' + documentId + "/read/role/registered";
          @request 'DELETE', url
        getProfile: (username) ->
          url = config.url + '/user/' + username
          @request 'GET', url
        setProfile: (username, data) ->
          url = config.url + '/me'
          @request 'PUT', url, null, data
        resetPassword: (username) ->
          url = config.url + '/user/' + username + '/password/reset'
          @request 'GET', url
        getDocument: (collection, uniqueId) ->
          url = config.url + '/document/' + collection + "/" + uniqueId
          @request 'GET', url
        listDocuments: (collection, query, params) ->
          url = config.url + '/document/' + collection
          args = if query? then {where: query, params: params} else null
          @request 'GET', url, args
        createDocument: (collection, document) ->
          url = config.url + "/document/" + collection
          @request 'POST', url, "", document
        updateDocument: (collection, uniqueId, document) ->
          url = config.url + '/document/' + collection + "/" + uniqueId
          @request 'PUT', url, "", document
        createOrUpdate: (collection, document) ->
          if document.id
            @updateDocument collection, document.id, document
          else
            @createDocument collection, document
      }
