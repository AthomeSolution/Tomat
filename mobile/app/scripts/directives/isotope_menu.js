(function () {
  'use strict';

  angular.module('EcreateIonic').directive('menuIsotope', function ($timeout, persist) {
    return {
      restrict: 'E',
      templateUrl: 'templates/menu-isotope.html',
      replace: true,
      link: function (scope, elements, attributes) {
        scope.elements = elements;

        persist.list('datas', 'type="menu"').then(function (data) {
          var menus = data[0].data;
          for (var index in menus) {
            menus[index].index = parseInt(index) + 1;
          }
          scope.menus = menus;
          console.log("MENU: loaded");
        });

        scope.container = $(elements).isotope({
          itemSelector: '.bloc',
          layoutMode: 'fitRows',
          getSortData: {
            number: '[data-number] parseInt'
          },
          sortBy: 'number',
          sortAscending: true
        });

        /*scope.$watch('menus', function() {
         //scope.container.on('tap', '.bloc', deployMenu);
         $timeout(function() {
         $('.bloc', scope.container).on('tap', deployMenu);
         }, 500);

         });*/

        scope.deployMenu = function (key) {
          var item = $('.bloc.bloc_' + key, elements);

          if ($('.bloc.gigante', elements).length == 0) {
            $('.bloc', elements).addClass('small-width');

            item.addClass('gigante').removeClass('small-width');
            //$(this).insertBefore($(this).parent().children()[0]);
            $('.important', elements).hide(); //fadeOut(100);
            $('.title', elements).addClass('rotate-title');
            item.find('.all').show(); //fadeIn(110);
          } else {
            if (item.hasClass('gigante')) {
              item.removeClass('gigante');
              $('.bloc', elements).removeClass('small-width');
              $('.important', elements).show(); //.fadeIn(100);
              $('.title', elements).removeClass('rotate-title');
              $('.all', elements).hide(); //fadeOut(110);


            } else {
              $('.bloc', elements).removeClass('gigante').addClass('small-width');
              item.addClass('gigante').removeClass('small-width');
              //$(this).insertBefore($(this).parent().children()[0]);

              $('.important', elements).hide(); //fadeOut(100);
              $('.title', elements).addClass('rotate-title');
              $('.bloc > .all', elements).hide(); //fadeOut(100);
              item.find('.all').show(); //.fadeIn(100);
            }
          }

          var container = elements;
          var blocs = container.children();

          blocs.detach().sort(function (a, b) {
            if ($(a).hasClass('gigante')) return -1;
            if ($(b).hasClass('gigante')) return 1;

            return parseInt($(a).attr('data-initial-number')) > parseInt($(b).attr('data-initial-number')) ? 1 : -1;
          });
          container.append(blocs);
        };
        //scope.container.on('click', '.bloc', deployMenu);
      }
    }
  })
  ;
})();
