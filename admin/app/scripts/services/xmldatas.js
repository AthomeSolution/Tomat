angular.module('backendInterfaceApp')
    .factory('xmlDatas', function ($http, $resource,baasbox, config) {
        return {
            retrieveAsJson: function (datasource,data,callback) {
                baasbox.convert(datasource,data).then(function(data){
                    callback(data);
                })
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
                                        item.city = "Nevers";
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
            parseXml : function(xml) {
            var dom = null;
            if (window.DOMParser) {
                try {
                    dom = (new DOMParser()).parseFromString(xml, "text/xml");
                }
                catch (e) { dom = null; }
            }
            else if (window.ActiveXObject) {
                try {
                    dom = new ActiveXObject('Microsoft.XMLDOM');
                    dom.async = false;
                    if (!dom.loadXML(xml)) // parse error ..

                        window.alert(dom.parseError.reason + dom.parseError.srcText);
                }
                catch (e) { dom = null; }
            }
            else
                alert("cannot parse xml string!");
            return dom;
        },
            retrieveBaladesAsJson: function (url,callback) {
                $http.get("/ressources/randos.xml")
                    .then(function (data) {
                        var dom = new DOMParser().parseFromString(data.data,"text/xml");
                        var results = [];
                        var elementsByTagName = dom.getElementsByTagName("reply");
                        for (var i = 0; i < elementsByTagName.length; i++) {

                            var item = {};
                            item.type="balads";
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
                                            item.city = "Nevers";
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

                            results.push(item);
                        }}
                        callback(results);
                    });
            }
        }
    });