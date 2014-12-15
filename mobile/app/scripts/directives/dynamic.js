'use strict';

angular.module('EcreateIonic')
    .directive('dynamic', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, ele, attrs) {
                scope.$watch(attrs.dynamic, function (html) {
                    ele.html(html);
                    $('a', ele).click(function () {
                        window.open($(this).attr('href'), '_system');
                        return false;
                    });
                    $compile(ele.contents())(scope);
                });
            }
        };
    });