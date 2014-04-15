angular.module('backendInterfaceApp')
    .factory('xmlDatas', function ($http, $resource, config) {
        return {
            retrieveAsJson: function (url,callback) {
                var getOntoNode = function(uri,node){
                    try{
                        if(node.getAttribute("uri") == uri)
                            return node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                        return undefined;
                    }catch (e){
                        return undefined;
                    }
                };
                $http.get("/ressources/hotel.xml")
                    .then(function (data) {
                        var results = [];
                        var parser = new DOMParser();
                        var result = parser.parseFromString(data.data,"text/xml");
                        var elementsByTagName = result.getElementsByTagName("reply");
                        for (var i = 0; i < elementsByTagName.length; i++) {
                            var item = {};
                            item.type="hotel";
                            var element = elementsByTagName[i];
                            var title = element.getElementsByTagName("title")[0];
                            if(title){
                                item.text = title.getElementsByTagName("text")[0].innerHTML;
                            }else{
                                continue;
                            }
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
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#tarif_nuit_mini"){
                                            item.price = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#classement"){
                                            item.stars = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#nombre_de_chambres_105239"){
                                            item.rooms = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#capacite"){
                                            item.capacity = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#langue_parlee"){
                                            item.languages = "FR,EN,ITA";
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#adresse1"){
                                            item.address1 = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#adresse2"){
                                            item.address2 = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#code_postal"){
                                            item.postCode = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#commune_at"){
                                            item.city = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#telephone"){
                                            item.phone = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#e-mail"){
                                            item.mail = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#site_web"){
                                            item.web = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                        if(node.getAttribute("uri") == "http://www.nievre-tourisme.com/onto#Album_photos_104088"){
                                            item.photoAlbum = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                            continue;
                                        }
                                    }
                                }
                            }
                            results.push(item);
                        }
                        callback(results);
                    });
            },
        retrieveRestaurantsAsJson: function (url,callback) {
            $http.get("/ressources/restaurant.xml")
                .then(function (data) {
                    var results = [];
                    var parser = new DOMParser();
                    var result = parser.parseFromString(data.data,"text/xml");
                    var elementsByTagName = result.getElementsByTagName("reply");
                    for (var i = 0; i < elementsByTagName.length; i++) {
                        var item = {};
                        item.type="restaurant";
                        var element = elementsByTagName[i];
                        var title = element.getElementsByTagName("title")[0];
                        if(title){
                            item.text = title.getElementsByTagName("text")[0].innerHTML;
                        }else{
                            continue;
                        }
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
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#tarif_menu_mini"){
                                        item.price = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#classement"){
                                        item.stars = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#nombre_de_chambres_105239"){
                                        item.rooms = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#capacite"){
                                        item.capacity = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#langue_parlee"){
                                        item.languages = "FR,EN,ITA";
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#adresse1"){
                                        item.address1 = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#adresse2"){
                                        item.address2 = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#code_postal"){
                                        item.postCode = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#commune_at"){
                                        item.city = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#telephone"){
                                        item.phone = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#e-mail"){
                                        item.mail = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri")=="http://www.nievre-tourisme.com/onto#site_web"){
                                        item.web = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
                                    }
                                    if(node.getAttribute("uri") == "http://www.nievre-tourisme.com/onto#Album_photos_104088"){
                                        item.photoAlbum = node.getElementsByTagName("afs_literal")[0].getAttribute("data");
                                        continue;
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
    });