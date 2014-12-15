(function () {
    'use strict';
    angular.module('EcreateIonic').directive('slideshow', function($http, $compile) {
        return {
            restrict: 'E',
            //templateUrl: 'templates/discover/slideshow.html',
            link: function (scope, element, attrs) {
                scope.slides = $.map(element.children(), function(item) {
                    //return $(item).outerHTML();
                    return $('<div/>').html($(item).clone()).html();
                });

                $http.get('templates/discover/slideshow.html').success(
                    function(response)
                    {
                        element.html(response);
                        $compile(element.contents())(scope);
                    }
                );
            }
        }
    })
    ;
})();