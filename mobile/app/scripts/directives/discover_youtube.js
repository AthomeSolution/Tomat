(function () {
    'use strict';
    angular.module('EcreateIonic').directive('youtube', function ($sce, $interpolate) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                code: '@code'
            },
            templateUrl: 'templates/discover/youtube.html',
            link: function (scope, element, attrs) {
                scope.$watch('code', function (code) {
                    if (!code) return;
                    if (code.substr(0, 4) == 'http')
                        code = code.substr(code.indexOf('?v=') + 3);
                    if (code.indexOf("iframe") >= 0)
                        code = new RegExp('^.*embed\/([a-zA-Z0-9]+)".*$').exec(code)[1];

                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + code);
                });
            }
        }
    })
    ;
})();