angular.module('backendInterfaceApp')
    .factory('xmlDatas', function ($http, $resource, config) {
        return {
            retrieveAsJson: function (url) {
                $http.get("http://localhost:9000/ressources/hotel.xml")
                    .then(function (data) {
                        var results = [];
                        var parser = new DOMParser();
                        var result = parser.parseFromString(data.data,"text/xml");
                        var elementsByTagName = result.getElementsByTagName("reply");
                        for (var i = 0; i < elementsByTagName.length; i++) {
                            var item = {};
                            var element = elementsByTagName[i];
                            item.text = element.getElementsByTagName("title")[0].getElementsByTagName("text")[0].innerHTML;
                            var datas = element.getElementsByTagName("clientData")[0];
                            item.lat = datas.children[1].getAttribute("data");
                            item.lng = datas.children[2].getAttribute("data");
                            results.push(item);
                        }
                        return results;
                    });
            }

        }
    }
);