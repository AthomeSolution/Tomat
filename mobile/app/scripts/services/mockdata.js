'use strict';

angular.module('EcreateIonic')
    .run(function ($httpBackend, config) {




        var events = [
            {
                id: 1,
                date: new Date("July 19, 2014 18:00:00"),
                type: 'Festival',
                name: 'Festiv\'Halles en Eaux',
                dates: 'Du 19 juillet au 27 juillet 2014',
                img: 'http://doc-nievre-itis1.antisearch.net/100065/h/halleseneaux-efni.jpg',
                description: 'Festival entièrement gratuit... Festiv\'Halles en Eaux, c\'est : des concerts en journée et tous les soirs, des animations pour les enfants et les adultes, la découverte du milieu ligérien, un marché artisanal et de produits du terroir... d\'année en année des nouveautés, des surprises, ... Bref fin juillet, Decize est en fête ! La programmation 2014 est en cours, les standards du festival vous attendent mais aussi des nouveautés, des surprises... Deux "têtes d\'affiche" seront les stars d\'un programme riche et varié avec le groupe "The Christians" pour un come-back le samedi 19 juillet et "Soldat Louis" le samedi 26 juillet. Les 25, 26 et 27 juillet sont consacrés à la musique trad.',
                lat: 47.4595730, lng: 3.490
            },
            {
                id: 2,
                date: new Date("August 3, 2014 18:00:00"),
                type: 'Arts du spectacle',
                name: 'Fêtes Musciales de Corbigny',
                dates: 'Du 3 au 10 août 2014',
                img: 'http://doc-nievre-itis1.antisearch.net/100065/I/IMG_8477.JPG',
                description: "Déjà la 24e édition des Fêtes Musicales, un moment de l'année incontournable à Corbigny. Que ce soit dans l'enceinte de l'Abbaye classée monument historique ou dans d'autres lieux de la Ville, ce festival vous propose un belle diversité musicale.",
                lat: 47.4595728, lng: 3.525
            },
            {
                id: 3,
                date: new Date("Jul 1, 2014 18:00:00"),
                type: 'Festival',
                name: 'Festival de musique Garçon, La Note !',
                dates: 'Du 1er juillet au 30 aoùt 2014',
                img: 'http://bourgogne.tourinsoft.com/upload/GLN--Doc1.jpg',
                description: "14e édition. Tous les soirs du lundi au samedi du 1er juillet au 30 août, un concert est organisé en terrasse d'un café ou d'un restaurant d'Auxerre ou de l'Auxerrois, soit au total 52 concerts durant tout l'été.",
                lat: 47.45957, lng: 3.518399
            }
        ];
        $httpBackend.whenGET(new RegExp(config.url + '/document/events([^/]*)$'))
            .respond({"result": "ok", "data": events, "http_code": 200});

        var getEvent = new RegExp(config.url + '/document/events/(.*)$');
        $httpBackend.whenGET(getEvent)
            .respond(function (method, url, data) {
                var params = getEvent.exec(url);
                var result = [404, {"result": "error", "http_code": 404}, {}];
                angular.forEach(events, function (value, key) {
                    if (value.id === parseInt(params[1]))
                        result = [200, {"result": "ok", "data": value, "http_code": 200}, {}];
                });
                return result;
            });

        var discover = [
            {
                id: 1,
                name: 'The Canal',
                content: '<article><p> <a href="#/discover/2"><img src="images/vignoble.png" border="0"></a>' +
                    '<a href="#/discover/3"><img src="images/villages.png" border="0"></a>' +
                    '<a href="#/discover/4"><img src="images/flottage.png" border="0"></a>' +
                    '<a href="#/discover/5"><img src="images/nature.png" border="0"></a></p>' +
                    '<a href="#/discover/6"><img src="images/confluence.png" border="0"></a>' + 'Au gré de vos envies, le canal du Nivernais vous dévoilera 5 aspects de sa personnalité.' +
                    'Le temps d\'une croisière en bateau ou d\'une escapade à vélo sur les chemins de halages, partez à la rencontre des vignerons de l\'Auxerrois ou des petits villages typiques.' +
                    ' A Clamecy, remontez le temps à l\'époque des flotteurs de bois. Si la nature vous inspire, venez observer la faune ' +
                    'et la flore dans la vallée de Sardy ou contemplez les paysages mélancoliques de la confluence à Decize.</article>' +
                    '<youtube url="https://www.youtube.com/watch?v=FGdMyGnOR8g"></youtube>'
            },
            {
                id: 2,
                name: 'Escale Vignoble (vineyard)',
                content: '<article><p><img src="http://www.canal-du-nivernais.com/portal_upload/images/template/carte_vignobles_zoom.jpg" width="98%"></p>' +
                    'Au départ d\'Auxerre, Ville d\'art et d\'histoire, cette escale parcourt les vignes de l\'Auxerrois.' +
                    ' Les viticulteurs vous feront partager leur passion des vins renommés de villages comme Saint-Bris-le-Vineux, Coulanges-la-Vineuse, Irancy…' +
                    ' Lors de cette escale, ne manquez pas la visite des Caves de Bailly Lapierre à Saint-Bris-le-Vineux, ' +
                    'qui servirent d\'abord de champignonnières avant d\'être transformées en immenses caves à vin.</article>' +
                    '<slideshow>' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/vignobles1.jpg" width="350" height="250" >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/vignobles2.jpg" width="350"  height="250" >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/vignobles3.jpg" width="350"  height="250">,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/vignobles4.jpg" width="350"  height="250">' +
                    '</slideshow>' +
                    '<youtube url="https://www.youtube.com/watch?v=HF_9rQ2Ap6U"></youtube>'

            }
            ,
            {
                id: 3,
                name: 'Escale Village (villages)',
                content: '<article><p><img src="http://www.canal-du-nivernais.com/portal_upload/images/template/carte_villages_zoom.jpg" width="98%"  ></p>Cette escale ravira les promeneurs qui découvriront de pittoresques villages nichés au cœur des vallées de la Cure' +
                    ' et de l\'Yonne : Cravant, Vermenton, Mailly-la-Ville, Mailly-le-Château… A Cravant, vous pourrez contempler les vestiges ' +
                    'de cette cité médiévale : maisons à colombages, donjon et église contribuent aujourd\'hui fortement au cachet du village.<br><br>' +
                    '<a href="http://www.wobook.com/WBCT3ot83V1p-f" target="_blank">Télécharger le guide</a><br>' +
                    '</article>' +
                    '<slideshow>' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/villages1.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/villages2.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/villages3.jpg" width="350" height="250" >' +
                    '</slideshow>' +
                    '<youtube url="https://www.youtube.com/watch?v=Mebpyd8s5x0"></youtube>'

            }
            ,
            {
                id: 4,
                name: 'Escale Flottage (floating)',
                content: '<article><p><img src="http://www.canal-du-nivernais.com/portal_upload/images/template/carte_flottage_zoom.jpg" width="98%"  ></p>Découvrez le territoire du flottage et les techniques ingénieuses qui étaient utilisées à l\'époque pour acheminer le bois de chauffage du Morvan à la Capitale. ' +
                    'Chaque été, la ville de Clamecy célèbre d\'ailleurs ces techniques lors de la Fête du Flottage.</article>' +
                    '<slideshow>' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/flottage1.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/flottage2.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/flottage3.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/flottage4.jpg" width="350" height="250" >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/flottage5.jpg" width="350" height="250" >' +

                    '</slideshow>' +
                    '<youtube url="https://www.youtube.com/watch?v=VImbBviG0RA"></youtube>'

            }
            ,
            {
                id: 5,
                name: 'Escale Nature (countryside)',
                content: '<article><p><img src="http://www.canal-du-nivernais.com/portal_upload/images/template/carte_nature1_zoom.jpg" width="98%"  ></p>La verdure du Canal du Nivernais dissimule des merveilles : une promenade en bateau vous permettra de découvrir ' +
                    'au travers de la commune de Sardy-Les-Epiry l\’alignement de 16 écluses qui forment ce qu’on appelle aujourd’hui l\’ <strong>«échelle de Sardy »</strong>.<br>' +
                    'Non loin de là, vous serez étonnés par les superbes <strong>voûtes de la Collancelle</strong>, étalées sur 760m de long.Longez encore un peu le canal et' +
                    ' vous trouverez les <strong>étangs de Vaux et de Baye</strong>, classés « Espaces Naturels Sensibles » de par la singularité et la végétation de' +
                    ' leurs paysages. De nombreuses activités telles que la pêche ou les balades en bateau sont possibles. <br>' +
                    'Amoureux de la nature ? Descendez le canal jusqu\’à Biches et découvrez le <strong>sentier de découverte de la Fontaine de Chamont</strong>, idéal' +
                    ' pour les balades en famille : vous apprécierez de vous promener dans la forêt atypique qui s\’y trouve, croiser de nombreux' +
                    ' petits animaux, mais aussi rejoindre des circuits de randonnées.<br><br>' +
                    '<a href="http://www.wobook.com/WBCT3ot83V1p-f" target="_blank">Télécharger le guide</a><br>' +
                    'Balades-rando : <a href="http://pmarmion.wix.com/e-rando">http://pmarmion.wix.com/e-rando</a></article>' +
                    '<slideshow>' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature1.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature2.jpg" width="350"  height="250" >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature3.jpg" width="350"  height="250" >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature4.jpg" width="350"  height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature5.jpg" width="350"  height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature6.jpg" width="350"  height="250" >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature7.jpg" width="350"  height="250" >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/nature8.jpg" width="350"  height="250" >' +
                    '</slideshow>' +
                    '<youtube url="https://www.youtube.com/watch?v=w4XJFXSHs2Y"></youtube>'

            }
            ,
            {
                id: 6,
                name: 'Escale Confluence (confluence)',
                content: '<article><p><img src="http://www.canal-du-nivernais.com/portal_upload/images/template/carte_confluence_zoom.jpg" width="98%"  ></p>Point de convergence de canaux et rivières avec la Loire, l\'eau est le point de mire de cette escale qui' +
                    ' se termine à Decize, porte sud du Canal du Nivernais ouverte sur la grande boucle des canaux de Bourgogne.<br> Aussi, laissez-vous' +
                    ' guider jusqu\’à Saint-Léger-Des-Vignes pour contempler le fameux bateau de touage utilisé autrefois pour remorquer les péniches' +
                    ' du Canal du Nivernais vers le Canal latéral de la Loire.</article>' +
                    '<slideshow>' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/confluence1.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/confluence2.jpg" width="350" height="250"  >,' +
                    '<img src="http://www.canal-du-nivernais.com/Portal_Upload/Images/diaporama/zooms/confluence3.jpg" width="350" height="250"  >' +

                    '</slideshow>' +
                    '<youtube url="https://www.youtube.com/watch?v=L-f-XzvsQq0"></youtube>'

            }


        ];


        var getDiscover = new RegExp(config.url + '/document/discover/(.*)$');
        $httpBackend.whenGET(getDiscover)
            .respond(function (method, url, data) {
                var params = getDiscover.exec(url);
                var result = [404, {"result": "error", "http_code": 404}, {}];
                angular.forEach(discover, function (value, key) {
                    if (value.id === parseInt(params[1]))
                        result = [200, {"result": "ok", "data": value, "http_code": 200}, {}];
                });
                return result;
            });


        var getWeather = new RegExp(config.url + '/forecast/(.*)');
        $httpBackend.whenGET(getWeather).respond(
            {"result": "ok", "currently": {icon: "partly-cloudy-day", summary: "mostly sunny, high clouds", temperature: 15}, "http_code": 200}
        );

        $httpBackend.whenGET(/.*/).passThrough();
        $httpBackend.whenPOST(/.*/).passThrough();
        $httpBackend.whenPUT(/.*/).passThrough();


        $httpBackend.whenGET(/^templates\//).passThrough();
        $httpBackend.whenGET(/^i18n\//).passThrough();
        $httpBackend.whenGET(new RegExp('http://localhost')).passThrough();

    });
