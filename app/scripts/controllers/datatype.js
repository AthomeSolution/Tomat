angular.module('backendInterfaceApp')
    .controller('DatatypeCtrl',
    function ($scope, $location, auth, baasbox, config) {
        var init = function () {

            baasbox.listDocuments("datatypes").then(function(data){
                $scope.datatypes = data;
            });

        }
        $scope.content={};
        $scope.content.selectedDatatype ={};
        init();
});