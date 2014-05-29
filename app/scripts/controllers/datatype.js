angular.module('backendInterfaceApp')
    .controller('DatatypeCtrl',
    function ($scope, $location, $window, auth, baasbox, config) {
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

        $scope.deleteItem = function(field) {
            var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');

            if (deleteUser) {
                $scope.content.selectedDatatype.structure.remove(field);
            }

        }

        $scope.createNewType = function()  {
            $scope.content.selectedDatatype ={};
            $scope.content.selectedDatatype.name="Name";
            $scope.content.selectedDatatype.structure = [];
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