'use strict';

angular.module('backendInterfaceApp').directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            dialogTitle: '@',
            onClose: '&?'

        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function (scope,element, attrs) {
            scope.dialogStyle = {};

            //$scope.modalShown = false;
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function () {
                scope.show = false;
            };
        },
        templateUrl: 'partials/modal.html'

    }
});