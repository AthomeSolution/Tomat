'use strict';

angular.module('backendInterfaceApp')
    .controller('MainCtrl',



    function ($scope, $location, $http, auth, baasbox, config, instagram, xmlDatas) {
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

        $scope.externalDatas = function(){
            xmlDatas.retrieveAsJson("");
        }




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


        $scope.center={ lat: 46.98,
            lng: 3.16,
            zoom: 14};

        $scope.markers = [

        ];

        var init = function () {
            baasbox.listDocuments("poi").then(function (data) {
                $scope.localizedItems = data;

            });

        }
        init();
    });
