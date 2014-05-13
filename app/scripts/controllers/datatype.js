angular.module('backendInterfaceApp')
    .controller('DatatypeCtrl',
    function ($scope, $location, auth, baasbox, config) {
        var init = function () {

            baasbox.listDocuments("datatypes").then(function(data){
                $scope.datatypes = data;
            });

        }

        $scope.addNewField = function () {
            $scope.content.selectedDatatype.structure.NewField = "";
        }

        $scope.createNewType = function()  {
            $scope.content.selectedDatatype ={};
            $scope.content.selectedDatatype.name="Name";
            $scope.content.selectedDatatype.structure = {};
        }

        $scope.content={};
        $scope.content.selectedDatatype ={};
        init();
});