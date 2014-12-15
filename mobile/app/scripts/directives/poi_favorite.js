(function () {
  'use strict';

  angular.module('EcreateIonic').directive('poiFavorite', function ($rootScope, $ionicPopup, $location, baasbox, localize) {
      return {
        restrict: 'E',

        template: '<span class="poi-favorite">' +
          '<button ng-click="toggleFavorite($event)">' +
          '<i class="fa fa-heart-o" ng-hide="item.hasFavorite"></i>' +
          '<i class="fa fa-heart" ng-show="item.hasFavorite" ></i>' +
          '</button>' +
          '</span>',
        replace: true,
        scope: {
          item: '=',
          favorites: "=",
          onFavoriteChanged: '&?'
        },
        link: function (scope, elements, attributes) {
          var popupScope = $rootScope.$new();
          popupScope.item = scope.item;
          popupScope.comment = "";
          popupScope.onUpdate = function (comment) {
            popupScope.comment = comment;
          };
          popupScope.setFavorite = function (favorite) {

            var isAlreadyFav = $rootScope.bookContains(favorite, scope.item);
            if (isAlreadyFav) {
              $rootScope.removeFav(favorite, scope.item);
              if (scope.onFavoriteChanged) {
                scope.onFavoriteChanged({item: scope.item});
                $rootScope.onFavoriteChanged({item: scope.item});
              }
            } else {
              scope.favorite = favorite;
              popupComment();
            }
          };

          scope.addFavorite = function (comment) {
            $rootScope.addFav(scope.favorite, scope.item, comment);
            if (scope.onFavoriteChanged) {
              scope.onFavoriteChanged({item: scope.item});
              $rootScope.onFavoriteChanged({item: scope.item});
            }
          };

          popupScope.addBook = function (book) {
            $rootScope.userData.favorites.push({id: 11, name: book, pois: {}});
            scope.newbook = '';
          };

          scope.toggleFavorite = function ($event) {
            if (baasbox.logged_username == null || baasbox.logged_username == 'admin') {
              var url = $location.url();
              $location.path('/login').search('url', url);
              $event.preventDefault();
              return false;
            }

            scope.popup = $ionicPopup.show({
              templateUrl: 'templates/poi/popup-favorites.html',
              title: localize.getLocalizedString('Add to favorite'),
              scope: popupScope,
              buttons: [
                { text: localize.getLocalizedString('Close'), onTap: function (e) {
                  return true;
                }}
              ]
            }).then(function (res) {
            }, function (err) {
            }, function (popup) {
              scope.popup = popup;
            });

            $event.preventDefault();

            return false;
          };

          var popupComment = function () {
            $ionicPopup.show({
              templateUrl: 'templates/poi/popup-favorites-comment.html',
              title: localize.getLocalizedString('Comment your favorite'),
              scope: popupScope,
              buttons: [
                { text: localize.getLocalizedString('OK'), onTap: function (e) {
                  scope.addFavorite(popupScope.comment);
                  return true;
                }},
                { text: localize.getLocalizedString('Close'), onTap: function (e) {
                  return true;
                }}
              ]
            }).then(function (res) {
            }, function (err) {
            }, function (popup) {
              scope.popup = popup;
            });
          }
        }
      }
    }
  );
})();
