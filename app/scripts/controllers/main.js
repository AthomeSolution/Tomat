'use strict';

angular.module('backendInterfaceApp')
    .controller('MainCtrl',



    function ($scope, $location, $http, $routeParams, auth, baasbox, config, instagram, xmlDatas) {
        $scope.isLoggedIn = auth.isLoggedIn();
       $scope.instagramImagesShown = false;
        $scope.datasource = {};
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
                $scope.instagramImagesShown = true;
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
            $scope.instagramImagesShown = false;
        }

        $scope.loadExternalDatas = function(){
            var f = document.getElementById('file').files[0],
                r = new FileReader();
            if(f){
                r.onloadend = function(e){
                    var data = e.target.result;
                    $scope.externalDatas=[];
                    xmlDatas.retrieveAsJson($scope.datasource.selectedDatasource, data,
                    function(data){
                        $scope.externalDatas = $scope.externalDatas.concat(data);
                    });
                }
                r.readAsBinaryString(f);
            }else{
                $scope.externalDatas=[];
                xmlDatas.retrieveAsJson($scope.datasource.selectedDatasource, null,
                    function(data){
                        $scope.externalDatas = $scope.externalDatas.concat(data);
                    });
            }

          /*  xmlDatas.retrieveRestaurantsAsJson("",function(data){
                $scope.externalDatas = $scope.externalDatas.concat(data);
            });
            xmlDatas.retrieveBaladesAsJson("",function(data){
                $scope.externalDatas = $scope.externalDatas.concat((data));
            }) */
        };

        $scope.datasource.selectedDatasource = {url:"",root:"",structure:{}};







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

        $scope.createNewDataSource = function(){
            $scope.datasource.selectedDatasource = {url:"",root:"",structure:{}};
        };

        var updateItemFromData = function (item,data){
            for (var key in data) {
                if(key && key.length > 0)
                    item[key] = data[key];
            }
        }

        $scope.type = {};
        $scope.type.selectedType ={};

        $scope.onSourceUpdate= function() {
            console.log($scope.datasource.selectedDatasource);
        }

        $scope.onTypeUpdate = function(){
            $scope.datasource.selectedDatasource.type = $scope.type.selectedType.name;
            var currentFields = $scope.datasource.selectedDatasource.fields;
            if(!currentFields)
                currentFields = [];
            $scope.datasource.selectedDatasource.fields = [];
            for (var i = 0; i < $scope.type.selectedType.structure.length; i++) {
                var newField = $scope.type.selectedType.structure[i];
                var currentField = currentFields.filter(function(field){
                    return field.name === newField.name;
                });
                if(currentField  && currentField.length > 0){
                    currentField[0].type = newField.type;
                    $scope.datasource.selectedDatasource.fields.push(currentField[0]);
                }else{
                    $scope.datasource.selectedDatasource.fields.push({"name":newField.name,"value":newField.path,"path":"","type":newField.type});
                }
            }
        }
        //TODO Référence pour la structure
        /* var item =
         {
         name: externalData.text,
         lng: parseFloat(externalData.lng),
         lat: parseFloat(externalData.lat),
         img: externalData.img,
         description: externalData.descr,
         selected: true,
         instagramId : 3000299,
         instagramLocationName:"default",
         external:true,
         type: externalData.type,
         infos:{
         stars : externalData.stars,
         rooms : parseInt(externalData.rooms),
         capacity : parseInt(externalData.capacity),
         languages : externalData.languages
         },
         web : externalData.web,
         album : externalData.photoAlbum,
         address : {
         address1 : externalData.address1,
         address2 : externalData.address2,
         postCode : externalData.postCode,
         city : externalData.city
         },
         mail : externalData.mail,
         phone : externalData.phone
         };
         if(parseFloat(externalData.price)){
         item.price = "from "+parseFloat(externalData.price).toFixed(0)+" €";
         };*/

        $scope.saveExternalDatas = function(){
            var formerItems = [];
            if($scope.localizedItems)
                for (var i = 0; i < $scope.localizedItems.length; i++) {
                    var item = $scope.localizedItems[i];
                    if(item.datasourceId === $scope.datasource.selectedDatasource.id)
                        formerItems.push(item);
                        //baasbox.deleteDocument("poi", item.id);
                }

            for (var i = 0; i < $scope.externalDatas.length; i++) {
                var externalData = $scope.externalDatas[i];
                var formerItem = formerItems.filter(function(item){
                    return item.uniqueId === externalData.uniqueId;
                });
                if(!formerItem || formerItem.length == 0){
                    item = {
                        selected: true,
                        instagramId : 3000299,
                        instagramLocationName:"default",
                        datasourceId:$scope.datasource.selectedDatasource.id,
                        fields: $scope.datasource.selectedDatasource.fields,
                        type:$scope.datasource.selectedDatasource.type
                    };
                }else{
                    item = formerItem;
                }
                if(externalData.name){
                   updateItemFromData(item,externalData);
                    baasbox.createOrUpdateDocument("poi", item).then(function (data) {
                        $scope.localizedItems.push(data.data);
                    });
                }
            }

            baasbox.createOrUpdateDocument("datasources",$scope.datasource.selectedDatasource).then(function(data){
                $scope.datasources.push(data.data);
            });

            $scope.modalShown = false;
            init();
        }


        $scope.center={ lat: 46.98,
            lng: 3.16,
            zoom: 14};

        $scope.markers = [

        ];

        $scope.imgOrNull = function (img){
            if(img)
                return img;
            else
                return "https://defcad.com/missing_object.jpg"
        }

        $scope.isExternal = $routeParams.external;


        $scope.modalShown = $routeParams.external;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };



        var init = function () {
            baasbox.listDocuments("poi").then(function (data) {
                $scope.localizedItems = data;

            });
            baasbox.listDocuments("datasources").then(function(data){
                $scope.datasources = data;
                if($scope.datasources && $scope.datasources.length > 0){
                    $scope.datasource.selectedDatasource = $scope.datasources[0];
                }
            });
            baasbox.listDocuments("datatypes").then(function(data){
                $scope.datatypes = data;
            });

        }
        init();
    });
