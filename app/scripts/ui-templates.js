angular.module('ui-templates', ['app/partials/modal.html', 'app/partials/pagination.html']);

angular.module("app/partials/modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/partials/modal.html",
    "<div class='ng-modal' ng-show='show'>\n" +
    "    <div class='ng-modal-overlay' ng-click='hideModal()'></div>\n" +
    "\n" +
    "    <div class='ng-modal-dialog' ng-style='dialogStyle'>\n" +
    "        <div class=\"header-modal\">\n" +
    "            <div class='ng-modal-close' ng-click='hideModal()'><i class=\"glyphicon glyphicon-remove\"></i></div>\n" +
    "            <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length'  ng-bind='dialogTitle'></span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class='ng-modal-dialog-content' ng-transclude></div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/partials/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/partials/pagination.html",
    "<ul class=\"pagination\">\n" +
    "    <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1)\">{{getText('first')}}</a></li>\n" +
    "    <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "    <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "    <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "    <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages)\">{{getText('last')}}</a></li>\n" +
    "</ul>");
}]);
