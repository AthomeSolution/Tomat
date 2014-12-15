'use strict';

angular.module('EcreateIonic')
  .factory('template', function ($http, $compile, $q, $interpolate) {
    return {
      response: null,
      getTemplate: function (template, templateScope, parameters) {
        var deferred = $q.defer();
        var exp = $interpolate(template);
        var html = exp(templateScope)
        deferred.resolve({html: html, parameters: parameters});

        return deferred.promise;
      }
    }

  });
