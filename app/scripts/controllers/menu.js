angular.module('backendInterfaceApp')
    .controller('MenuCtrl',
    function ($scope, $location, auth, baasbox, config) {
        var init = function () {

            baasbox.listDocuments("datas", "name = 'menu'").then(function (data) {
                $scope.data = data[0];
                $scope.menu = $scope.data.data;
            });

        }

        $scope.saveMenu = function() {

            baasbox.updateDocument('datas', $scope.data.id, $scope.data).then(
                function(data){
                    $scope.data = data.data;
                    $scope.menu = $scope.data.data;
                    if($scope.currentTopMenu != null){
                        var newMenu = $scope.menu.filter(function(menu){
                            return menu.label === $scope.currentTopMenu.label;
                        });
                        if(newMenu && newMenu.length > 0){
                            $scope.openTopMenu(newMenu[0]);
                        }
                    }else if($scope.currentMenuParent != null){
                        var newMenu = $scope.menu.filter(function(menu){
                            return menu.label === $scope.currentMenuParent.label;
                        });
                        if(newMenu && newMenu.length > 0){
                            var newSubMenu = newMenu[0].links.filter(function(menu){
                                return menu.label === $scope.currentMenu.label;
                            });
                            if(newSubMenu && newSubMenu.length > 0){
                                $scope.openMenu(newSubMenu[0],newMenu[0]);
                            }
                        }
                    }
                }
            );
        }

        $scope.openTopMenu = function(item) {
            $scope.currentTopMenu = item;
            $scope.currentMenu = null;
            $scope.oldCurrentMenuParent = null;
            $scope.currentMenuParent = null;
        }

        $scope.openMenu = function(item, parent) {
            $scope.currentMenu = item;
            $scope.oldCurrentMenuParent = parent;
            $scope.currentMenuParent = parent;
            $scope.currentTopMenu = null;
        }

        $scope.parentChanged = function() {
            var index = $scope.oldCurrentMenuParent.links.indexOf($scope.currentMenu);
            $scope.oldCurrentMenuParent.links.splice(index, 1);
            $scope.currentMenuParent.links.push($scope.currentMenu);
        }

        $scope.addItem = function() {
            var item = {
                "label": "New item",
                "uri": "",
                "icon": ""
            };
            if($scope.currentTopMenu != null){
                $scope.currentTopMenu.links.push(item);
            }else if ($scope.currentMenuParent != null){
                $scope.currentMenuParent.links.push(item);
            }else{
                $scope.menu[0].links.push(item);
            }
        }

        $scope.upItem = function() {
            var index = $scope.oldCurrentMenuParent.links.indexOf($scope.currentMenu);
            if (index>0)
                move($scope.oldCurrentMenuParent.links, index, index-1);
        }

        $scope.downItem = function() {
            var index = $scope.oldCurrentMenuParent.links.indexOf($scope.currentMenu);
            if (index<$scope.oldCurrentMenuParent.links.length-1)
                move($scope.oldCurrentMenuParent.links, index, index+1);
        }

        var move = function (array, old_index, new_index) {
            if (new_index >= array.length) {
                var k = new_index - array.length;
                while ((k--) + 1) {
                    array.push(undefined);
                }
            }
            array.splice(new_index, 0, array.splice(old_index, 1)[0]);
            return array; // for testing purposes
        };

        $scope.removeItem = function() {
            var index = $scope.oldCurrentMenuParent.links.indexOf($scope.currentMenu);
            $scope.oldCurrentMenuParent.links.splice(index, 1);
        }

        /*$scope.menu = [
            {
                label: "Discover",
                color: '#2075b7',
                links: [
                    {
                        label: 'The canal',
                        uri: '#/discover/1',
                        icon: 'ion-waterdrop'
                    },
                    {
                        label: "Escale vignoble",
                        uri: '#/discover/2',
                        icon: 'ion-image'
                    },
                    {
                        label: "Escale village",
                        uri: '#/discover/3',
                        icon: 'ion-image'
                    },
                    {
                        label: "Escale village",
                        uri: '#/discover/4',
                        icon: 'ion-image'
                    }
                ]
            },
            {
                label: "Stay",
                color: '#e04246',
                links: [
                    {
                        label: "Accomodation",
                        uri: '#/pois/hotel',
                        icon: 'fa fa-hospital-o'
                    },
                    {
                        label: "Restaurant",
                        uri: '#/pois/restaurant',
                        icon: 'fa fa-cutlery'
                    },
                    {
                        label: 'visit',
                        uri: '',
                        icon: 'fa fa-eye'
                    }
                ]
            }
        ];*/
        var discover = [
            {
                id: 1,
                name: 'The Canal',
                content:'<article><p> <a href="#/discover/2"><img src="/images/vignoble.png" border="0"></a>' +
                    '<a href="#/discover/3"><img src="/images/villages.png" border="0"></a>' +
                    '<a href="#/discover/4"><img src="/images/flottage.png" border="0"></a>' +
                    '<a href="#/discover/5"><img src="/images/nature.png" border="0"></a></p>' +
                    '<a href="#/discover/6"><img src="/images/confluence.png" border="0"></a>' +'Au gré de vos envies, le canal du Nivernais vous dévoilera 5 aspects de sa personnalité.' +
                    'Le temps d\'une croisière en bateau ou d\'une escapade à vélo sur les chemins de halages, partez à la rencontre des vignerons de l\'Auxerrois ou des petits villages typiques.' +
                    ' A Clamecy, remontez le temps à l\'époque des flotteurs de bois. Si la nature vous inspire, venez observer la faune ' +
                    'et la flore dans la vallée de Sardy ou contemplez les paysages mélancoliques de la confluence à Decize.</article>' +
                    '<youtube url="https://www.youtube.com/watch?v=FGdMyGnOR8g"></youtube>'

            }];
        init();
    })
;
