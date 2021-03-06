angular.module('backendInterfaceApp')
    .controller('ContentCtrl',
    function ($scope, $location, auth, baasbox, config) {

        $scope.toolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
            ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft','justifyCenter','justifyRight'],
            ['html', 'insertImage', 'insertLink', 'insertVideo'],
            ['insertYoutube']
        ];

        var init = function () {

            baasbox.listDocuments("contents").then(function (data) {
                $scope.contents = data;
                if($scope.contents.length > 0){
                    $scope.currentContent = $scope.contents[0];
                }else{
                    $scope.currentContent = {};
                }
            });

        }

        $scope.addContent = function() {
            var item = {
                name: 'New article',
                content:''
            }
            $scope.currentContent = item;
            $scope.contents.push(item);
        }

        $scope.saveContent = function() {
            //console.log($scope.data);
            baasbox.createOrUpdateDocument('contents', $scope.currentContent).then(
                function(data) {
                    $scope.currentContent = data.data;
                }
            );
        }

        $scope.deleteContent = function() {
            baasbox.deleteDocument('contents',$scope.currentContent.id).then(function(data){
                init();
            });
        }

        $scope.openContent = function(item) {
            $scope.currentContent = item;
        }

        /*$scope.contents = [
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

            }]; */
        init();
    })
;
