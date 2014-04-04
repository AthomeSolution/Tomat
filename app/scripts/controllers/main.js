'use strict';

angular.module('backendInterfaceApp')
    .controller('MainCtrl',



    function ($scope, $location, $http, $routeParams, auth, baasbox, config, instagram, xmlDatas) {
        $scope.isLoggedIn = auth.isLoggedIn();

       $scope.logout = function () {
            auth.logout();
            $location.path('/login');
        };

        $scope.editItem = function (item) {
            removeMarker();
            $scope.editingItem = item;
            computeCenter(item);
            item.draggable = true;
            item.message = item.name;
            $scope.markers.push(item);

        };

       $scope.changeFile = function(element){
           console.log(element);
       }

        function removeMarker() {
            if($scope.editingItem){
                var markers = $scope.markers;
                markers.splice(markers.indexOf($scope.editingItem), 1);
                $scope.editingItem = undefined;
            }
        };

        $scope.listInstagramPictures = function (item){
            $scope.instagramSelect = $scope.instagramActive();
            $scope.editItem(item);
            instagram.fetchPopular(item.instagramId ,function(data){
                $scope.instagramImages = data;
            })
        };

        $scope.fetchInstagramLocation = function (item){
            instagram.getClosestLocation(item.lat,item.lng,function(data){
                if(data && data.length > 0){
                    item.instagramId = data[0].id;
                    item.instagramLocationName = data[0].name;
                    $scope.listInstagramPictures(item);
                }
            })
        };

        $scope.instagramActive = function(){
            return config.useInstagram;
        }

        $scope.instagramSelect = false;

        $scope.addImageToItem = function(image) {
            $scope.editingItem.img = image.images.standard_resolution.url;
            $scope.submitItem($scope.editingItem);
            $scope.instagramSelect = false;
        }

        $scope.loadExternalDatas = function(){
            xmlDatas.retrieveAsJson("",function(data){
                $scope.externalDatas =  data;
            });
        };







        $scope.submitItem = function (item) {
            removeMarker();
           baasbox.updateDocument("poi", item.id, item).then(function (data) {
                init();
           });

        };

        $scope.deleteItem = function (item) {
            baasbox.deleteDocument("poi", item.id).then(function (data) {
                init();
            });
        };

        var computeMarker = function (item) {
            return {
                    lat : item.lat,
                    lng : item.lng,
                    message : item.name,
                    focus : true,
                    draggable : true
                }

        };

        var computeCenter = function (item) {
            $scope.center.lat = item.lat;
            $scope.center.lng = item.lng;
        };


        $scope.createItem = function () {
            var item = {name: "Name", lng: 46, lat: 3, selected: true, instagramId : 3000299,instagramLocationName:"default"};
            baasbox.createNewDocument("poi", item).then(function (data) {
                $scope.localizedItems.push(data.data);
                $scope.editingItem = data.data;
            });
        };

        $scope.saveExternalDatas = function(){
            for (var i = 0; i < $scope.localizedItems.length; i++) {
                var item = $scope.localizedItems[i];
                if(item.external)
                    baasbox.deleteDocument("poi", item.id);
            }

            for (var i = 0; i < $scope.externalDatas.length; i++) {
                var externalData = $scope.externalDatas[i];
                if(externalData.text){
                    var item =
                    {
                        name: externalData.text,
                        lng: parseFloat(externalData.lng),
                        lat: parseFloat(externalData.lat),
                        img: externalData.img,
                        description: externalData.descr,
                        selected: true,
                        instagramId : 3000299,
                        instagramLocationName:"default",
                        external:true
                    };
                    if(parseFloat(externalData.price)){
                        item.price = "from "+parseFloat(externalData.price).toFixed(0)+" €";
                    };
                    baasbox.createNewDocument("poi", item).then(function (data) {
                        $scope.localizedItems.push(data.data);
                    });
                }
            }
            $scope.modalShown = false;
            init();
        }


        $scope.center={ lat: 46.98,
            lng: 3.16,
            zoom: 14};

        $scope.markers = [

        ];

        $scope.isExternal = $routeParams.external;


        $scope.modalShown = $routeParams.external;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };



        var init = function () {
            baasbox.listDocuments("poi").then(function (data) {
                $scope.localizedItems = data;

            });

        }
        init();
    });
