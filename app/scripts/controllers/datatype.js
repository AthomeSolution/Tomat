angular.module('backendInterfaceApp')
    .controller('DatatypeCtrl',
    function ($scope, $location, auth, baasbox, config) {
        var init = function () {

            baasbox.listDocuments("datatypes").then(function(data){
                $scope.datatypes = data;
            });

        }

        $scope.addNewField = function () {
            $scope.content.selectedDatatype.structure.push({
                name:"New Field"
            });
        }

        $scope.delete = function(index) {
            $scope.content.selectedDatatype.structure.splice(index,1);
        }

        $scope.createNewType = function()  {
            $scope.content.selectedDatatype ={};
            $scope.content.selectedDatatype.name="Name";
            $scope.content.selectedDatatype.structure = [];
        }

        $scope.duplicate = function() {
            var dataType = $scope.content.selectedDatatype;
            $scope.content.selectedDatatype ={};
            $scope.content.selectedDatatype.name="Name";
            $scope.content.selectedDatatype.structure = [];
            for (var i = 0; i < dataType.structure.length; i++) {
                var field = dataType.structure[i];
                $scope.content.selectedDatatype.structure.push({
                    name:field.name,
                    path:field.path,
                    type:field.type
                });
            }
        }
        $scope.save = function(){
            baasbox.createOrUpdateDocument("datatypes",$scope.content.selectedDatatype).then(
                function(data){
                    $scope.content.selectedDatatype = data.data;
                    init();
                }
            )
        }

        $scope.content={};
        $scope.content.selectedDatatype ={};
        init();
});