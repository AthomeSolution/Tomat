angular.module('backendInterfaceApp')
    .controller('DatatypeCtrl',
    function ($scope, $location, $window, auth, baasbox, config) {
        var init = function () {

            baasbox.listDocuments("datatypes").then(function (data) {
                $scope.datatypes = data;
            });


        }

        $scope.addNewField = function () {
            $scope.content.selectedDatatype.structure.push({
                name: "New Field"
            });
        }
        $scope.deleteField = function (index) {

            var deleteField = $window.confirm('Are you absolutely sure you want to delete this field?');
            if (deleteField) {
                $scope.content.selectedDatatype.structure.splice(index, 1);
                $scope.save();
            }
        }
        $scope.deleteItem = function (field) {
            var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');

            if (deleteUser) {
                $scope.content.selectedDatatype.structure.remove(field);
            }

        }

        $scope.delete = function (index) {
            $scope.content.selectedDatatype.structure.splice(index, 1);
        }

        $scope.createNewType = function () {
            $scope.content.selectedDatatype = {};
            $scope.content.selectedDatatype.name = "Name";
            $scope.content.selectedDatatype.structure = [];
        }

        $scope.duplicate = function () {
            var dataType = $scope.content.selectedDatatype;
            $scope.content.selectedDatatype = {};
            $scope.content.selectedDatatype.name = "Name";
            $scope.content.selectedDatatype.structure = [];
            for (var i = 0; i < dataType.structure.length; i++) {
                var field = dataType.structure[i];
                $scope.content.selectedDatatype.structure.push({
                    name: field.name,
                    path: field.path,
                    type: field.type
                });
            }
        }
        $scope.save = function () {

            baasbox.createOrUpdateDocument("datatypes", $scope.content.selectedDatatype).then(
                function (data) {
                    $scope.content.selectedDatatype = data.data;
                    init();
                }
            )
        }

        $scope.downloadXML = function () {
            baasbox.downloadXML("poi", "").then(function (response) {

                var blob = new Blob([ response ], { type: 'text/plain' });
                window.open((window.URL || window.webkitURL).createObjectURL(blob), '_self');
            });
        }

        $scope.content = {};
        $scope.content.selectedDatatype = {};
        init();
    });