'use strict';

angular.module('EcreateIonic')
  .factory('socialsharing', function ($http, $rootScope, config, config_poi, $ionicPopup) {
    var generateField = function (item, conf, field) {
      if (conf[field] != null && conf[field] != '' && conf[field][0] != '')
        return vsprintf(conf[field][0], conf[field][1].map(function (value) {
          return item[value];
        }));

      return null;
    };

    var generatePoiField = function (poi, via, field) {
      var conf = config_poi[poi.type]['socialshare'][via];
      return generateField(poi, conf, field);
    };

    var generateEventField = function (event, via, field) {
      var conf = config['events']['socialshare'][via];
      return generateField(event, conf, field);
    };

    var generateFavoritesField = function (event, via, field) {
      var conf = config['favorites']['socialshare'][via];
      return generateField(event, conf, field);
    };

    function useCordova() {
      return window.plugins != null && window.plugins.socialsharing != null;
    }

    var share = function (via, message, image, url, subject, recipients) {
      if (message === "undefined") message = null;
      if (image === "undefined") image = null;
      if (url === "undefined") url = null;
      if (subject === "undefined") subject = null;

      if (useCordova()) {
        shareCordova(via, message, image, url, subject, recipients);
      } else {
        shareUrl(via, message, image, url, subject, recipients);
      }
    };

    var shareCordova = function (via, message, image, url, subject, recipients) {
      switch (via) {
        case 'facebook':
          window.plugins.socialsharing.shareViaFacebook(message, image, url);
          break;
        case 'twitter':
          window.plugins.socialsharing.shareViaTwitter(message, image, url);
          break;
        case 'tripadvisor':
          var alertPopup = $ionicPopup.alert({
            title: 'Trip Advisor share',
            template: 'Work in progress...'
          });
          break;
        case 'email':
          window.plugins.socialsharing.shareViaEmail(
            message,
            subject,
            recipients, // TO: must be null or an array
            null, // CC: must be null or an array
            null, // BCC: must be null or an array
            null  // FILES: must be null or an array
          );
          break;
        case 'sms':
          window.plugins.socialsharing.shareViaSMS(message);
          break;
        case 'pinterest':
          var pinUrl = "http://fr.pinterest.com/pin/create/button/?media=" + image + "&description=" + message;
          window.open(pinUrl, '_blank');
          break;
        case 'instagram':
          Instagram.isInstalled(function (err, installed) {
            if (installed) {
              console.log('Instagram is installed');
              Instagram.share(image, message, function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Instagram shared successfully');
                }
              });

            } else {
              console.log('Instragram is not installed : ' + err);
            }
          });
          break;
      }
    };

    var shareUrl = function (via, message, image, url, subject, recipients) {
      var request;

      switch (via) {
        case 'email':
          request = 'mailto:' + recipients + '?subject=' + subject + '&body=' + message;
          break;
        case 'facebook':
          request = 'https://www.facebook.com/dialog/feed?app_id=' + config.facebookAppId;
          if (url) request += '&link=' + url;
          if (image) request += '&picture=' + image;
          if (message) request += '&description=' + message;
          break;
        case 'twitter':
          request = 'https://twitter.com/share?';
          if (url) request += 'url=' + url;
          if (message) request += '&text=' + message;
          break;
        case 'pinterest':
          request = "http://fr.pinterest.com/pin/create/button/?media=" + image + "&description=" + message;
          break;
      }
      window.open(request, '_blank');
    };

    return {
      facebookSharePoi: function (poi) {
        share('facebook', generatePoiField(poi, 'facebook', 'messageTemplate'), generatePoiField(poi, 'facebook', 'imageTemplate'),
          generatePoiField(poi, 'facebook', 'urlTemplate')
        );
      },
      twitterSharePoi: function (poi) {
        share('twitter', generatePoiField(poi, 'twitter', 'messageTemplate'), generatePoiField(poi, 'twitter', 'imageTemplate'),
          generatePoiField(poi, 'twitter', 'urlTemplate')
        );
      },
      tripadvisorSharePoi: function (poi) {
        share('tripadvisor', generatePoiField(poi, 'tripadvisor', 'messageTemplate'), generatePoiField(poi, 'tripadvisor', 'imageTemplate'),
          generatePoiField(poi, 'tripadvisor', 'urlTemplate')
        );
      },
      emailSharePoi: function (poi) {
        share('email', generatePoiField(poi, 'email', 'messageTemplate'), null, null, generatePoiField(poi, 'facebook', 'subjectTemplate'),
          []
        );
      },
      smsSharePoi: function (poi) {
        share('sms', generatePoiField(poi, 'sms', 'messageTemplate'));
      },

      pinterestSharePoi: function (poi) {
        share('pinterest', generatePoiField(poi, 'pinterest', 'messageTemplate'), generatePoiField(poi, 'pinterest', 'imageTemplate'),
          generatePoiField(poi, 'pinterest', 'urlTemplate'));
      },

      instagramSharePoi: function (poi) {
        share('instagram', generatePoiField(poi, 'instagram', 'messageTemplate'), generatePoiField(poi, 'pinterest', 'imageTemplate'),
          generatePoiField(poi, 'pinterest', 'urlTemplate'));
      },

      facebookShareEvent: function (event) {
        share('facebook', generateEventField(event, 'facebook', 'messageTemplate'), generateEventField(event, 'facebook', 'imageTemplate'),
          generateEventField(event, 'facebook', 'urlTemplate')
        );
      },
      twitterShareEvent: function (event) {
        share('twitter', generateEventField(event, 'twitter', 'messageTemplate'), generateEventField(event, 'twitter', 'imageTemplate'),
          generateEventField(event, 'twitter', 'urlTemplate')
        );
      },
      emailShareEvent: function (event) {
        share('email', generateEventField(event, 'email', 'messageTemplate'), null, null, generateEventField(event, 'facebook', 'subjectTemplate'),
          []
        );
      },
      smsShareEvent: function (event) {
        share('sms', generateEventField(event, 'sms', 'messageTemplate'), null);
      },


      facebookShareFavorites: function (book, favorites) {
        var message = generateFavoritesField(book, 'facebook', 'messageTemplate');
        angular.forEach(favorites, function (value, key) {
          message += generateFavoritesField(value, 'facebook', 'listTemplate');
        });
        share('facebook', message, generateFavoritesField(book, 'facebook', 'imageTemplate'), generateFavoritesField(book, 'facebook', 'urlTemplate'));
      },
      twitterShareFavorites: function (book, favorites) {
        var message = generateFavoritesField(book, 'twitter', 'messageTemplate');
        angular.forEach(favorites, function (value, key) {
          message += generateFavoritesField(value, 'twitter', 'listTemplate');
        });
        share('twitter', message, generateFavoritesField(book, 'twitter', 'imageTemplate'), generateFavoritesField(book, 'twitter', 'urlTemplate'));
      },
      tripadvisorShareFavorites: function (book, favorites) {
        var message = generateFavoritesField(book, 'tripadvisor', 'messageTemplate');
        angular.forEach(favorites, function (value, key) {
          message += generateFavoritesField(value, 'tripadvisor', 'listTemplate');
        });
        share('tripadvisor', message, generateFavoritesField(book, 'tripadvisor', 'imageTemplate'), generateFavoritesField(book, 'tripadvisor', 'urlTemplate'));
      },
      emailShareFavorites: function (book, favorites) {
        var message = generateFavoritesField(book, 'email', 'messageTemplate');
        angular.forEach(favorites, function (value, key) {
          message += generateFavoritesField(value, 'email', 'listTemplate');
        });
        share('email', message, null, null, generateFavoritesField(book, 'facebook', 'subjectTemplate'), []);
      },
      smsShareFavorites: function (book, favorites) {
        var message = generateFavoritesField(book, 'sms', 'messageTemplate');
        angular.forEach(favorites, function (value, key) {
          message += generateFavoritesField(value, 'sms', 'listTemplate');
        });
        share('sms', message);
      },
      facebookLogin: function () {
        facebookConnectPlugin.login(["basic_info"],
          function (userData) {
            alert("UserInfo: " + JSON.stringify(userData));
            facebookConnectPlugin.getAccessToken(function (token) {
              $rootScope.facebookToken = token;
            }, function (err) {
              alert("Could not get access token: " + err);
            });
          },
          function (error) {
            alert("" + error)
          }
        );
      },
      useCordova: useCordova
    }
  }
)
;
