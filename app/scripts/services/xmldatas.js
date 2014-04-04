angular.module('backendInterfaceApp')
    .factory('xmlDatas', function ($http, $resource, config) {
        return {
            retrieveAsJson: function (url,callback) {
                $http.get("http://localhost:9000/ressources/hotel.xml")
                    .then(function (data) {
                        var results = [];
                        var parser = new DOMParser();
                        var result = parser.parseFromString(data.data,"text/xml");
                        var elementsByTagName = result.getElementsByTagName("reply");
                        for (var i = 0; i < elementsByTagName.length; i++) {
                            var item = {};
                            var element = elementsByTagName[i];
                            var title = element.getElementsByTagName("title")[0];
                            if(title)
                                item.text = title.getElementsByTagName("text")[0].innerHTML;
                            var abstract = element.getElementsByTagName("abstract")[0];
                            if(abstract)
                                item.descr = abstract.getElementsByTagName("text")[0].innerHTML;
                            var datas = element.getElementsByTagName("clientData")[0];
                            if(datas){
                                item.lat = datas.children[1].getAttribute("data");
                                item.lng = datas.children[2].getAttribute("data");
                                var resource = datas.children[0];
                                if(resource){
                                    for (var j = 0; j < resource.children.length; j++) {
                                        var node = resource.children[j];
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#visuel"){
                                            item.img = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            break;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#tarif_nuit_mini"){
                                            item.price = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            break;
                                        }
                                    }
                                }
                            }
                            results.push(item);
                        }
                        callback(results);
                    });
            }

        }
    }
);