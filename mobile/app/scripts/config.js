(function () {
  'use strict';

  angular.module('EcreateIonic')
    .value('config', {
     url: 'http://localhost:9000',
      appcode: '1234567890',
      locale: 'fr-FR',
      imageSizes: [0, 1],
      locales: {'en-US': 'English', 'fr-FR': 'Français', 'it-IT': 'Italiano', 'es-ES': 'Español'},
      facebookAppId: 'XXXXX',
      listMaxSize: 30,
      wifi: [
        {id: 'wifi1', name: 'Port des poujats', lat: 47.1692883388866, lng: 3.62273814408498},
        {id: 'wifi2', name: 'Port de Decize', lat: 46.8225187963437, lng: 3.45640390432952},
        {id: 'wifi3', name: 'Halte de Cercy la tour', lat: 46.8679098005129, lng: 3.64282799906887},
        {id: 'wifi4', name: 'Port de Clamecy', lat: 47.4579994580025, lng: 3.52287124998651},
        {id: 'wifi5', name: 'Port de Chaumot', lat: 47.2580793434326, lng: 3.6483930783386},
        {id: 'wifi6', name: 'Port de Pannecot', lat: 46.957158044269, lng: 3.74677623807504},
        {id: 'wifi7', name: 'Port de Châtillon', lat: 47.0491434227664, lng: 3.65261442763853},
        {id: 'wifi8', name: 'Vincelles', lat: 47.703323, lng: 3.633347},
        {id: 'wifi9', name: 'Cravant', lat: 47.681672, lng: 3.683688},
        {id: 'wifi10', name: 'Chatel Censoir', lat: 47.532383, lng: 3.62992},
        {id: 'wifi11', name: 'Auxerre', lat: 47.800818, lng: 3.573818},
        {id: 'wifi12', name: 'Mailly la Ville', lat: 47.598643, lng: 3.678908}
      ],
      favorites: {
        socialshare: {
          facebook: {
            messageTemplate: ['Découvrez mes favoris : %s\n', ['name']],
            listTemplate: ['- %s : %s\n', ['name', 'url']],
            imageTemplate: [''],
            urlTemplate: ['']
          },
          twitter: {
            messageTemplate: ['Découvrez mes favoris : %s\n', ['name']],
            listTemplate: ['- %s : %s\n', ['name', 'url']],
            imageTemplate: [''],
            urlTemplate: ['']
          },
          tripadvisor: {
            messageTemplate: ['Découvrez mes favoris : %s\n', ['name']],
            listTemplate: ['- %s : %s\n', ['name', 'url']],
            imageTemplate: [''],
            urlTemplate: ['']
          },
          email: {
            messageTemplate: ['Découvrez mes favoris : %s<br/>', ['name']],
            listTemplate: ['- %s : %s<br/>', ['name', 'url']],
            imageTemplate: [''],
            urlTemplate: ['']
          },
          sms: {
            messageTemplate: ['Découvrez mes favoris : %s\n', ['name']],
            listTemplate: ['- %s : %s\n', ['name', 'url']]
          }
        }
      }
    })
    .value('config_db', {
      name: 'ecreate',
      version: '1.0',
      description: 'offline data',
      size: 2 * 1024 * 1024
    })
    .value('offlineCollections', ['contents', 'datas', 'poi'])
    .value('config_poi', {
      hotel: {
        type: "hotel",
        text: 'HOTELS',
        orderby: 'real_distance',
        useTwitter: true,
        useFacebook: false,
        item: {
          templateUrl: 'templates/hotel/show.html'
        },
        listItem: {
          templateUrl: 'templates/hotel/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/hotel/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/hotel/mappopup.html',
          markerIcon: "building-o",
          markerColor: "red"
        },
        filters: {
          templateUrl: 'templates/hotel/filters.html'
        },
        socialshare: {
          facebook: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          twitter: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          pinterest: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          instagram: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          email: {
            subjectTemplate: ['ecreate sharing', []],
            messageTemplate: ['%s', ['name']]
          },
          sms: {
            messageTemplate: ['Hey! Découvrez : %s', ['name']]
          }
        },
        contact: {
          fields: ['contactTel', 'contactMobile']
        }
      },
      events: {
        type: "events",
        text: 'EVENTS',
        orderby: 'startDate',
        groupby: 'startDate',
        item: {
          templateUrl: 'templates/events/show.html'
        },
        listItem: {
          templateUrl: 'templates/events/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/events/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/events/mappopup.html',
          markerIcon: "calendar",
          markerColor: "orange"
        },
        filters: {
          templateUrl: 'templates/events/filters.html'
        },
        socialshare: {
          facebook: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          twitter: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          pinterest: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          instagram: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          email: {
            subjectTemplate: ['ecreate sharing', []],
            messageTemplate: ['%s', ['name']]
          },
          sms: {
            messageTemplate: ['Hey! Découvrez : %s\n%s', ['name', 'url']]
          }
        },
        contact: {
          fields: ['contactTel', 'contactMobile']
        }
      },
      restaurant: {
        type: "restaurant",
        text: 'RESTAURANTS',
        orderby: 'real_distance',
        useTwitter: true,
        useFacebook: true,
        item: {
          templateUrl: 'templates/restaurant/show.html'
        },
        listItem: {
          templateUrl: 'templates/restaurant/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/hotel/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/restaurant/mappopup.html',
          markerIcon: "cutlery",
          markerColor: "blue"
        },
        filters: {
          templateUrl: 'templates/restaurant/filters.html'
        },
        socialshare: {
          facebook: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          twitter: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          pinterest: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          instagram: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          email: {
            subjectTemplate: ['ecreate sharing', []],
            messageTemplate: ['%s', ['name']]
          },
          sms: {
            messageTemplate: ['Hey! Découvrez : %s\n%s', ['name', 'url']]
          }
        },
        contact: {
          fields: ['contactTel', 'contactMobile']
        }
      },
      balads: {
        type: "balads",
        text: 'BALADS',
        orderby: 'real_distance',
        useTwitter: true,
        useFacebook: true,
        item: {
          templateUrl: 'templates/balads/show.html'
        },
        listItem: {
          templateUrl: 'templates/balads/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/hotel/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/balads/mappopup.html',
          markerIcon: "leaf",
          markerColor: "green"
        },
        filters: {
          templateUrl: 'templates/balads/filters.html'
        },
        socialshare: {
          facebook: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          twitter: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          pinterest: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          instagram: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          email: {
            subjectTemplate: ['ecreate sharing', []],
            messageTemplate: ['%s', ['name']]
          },
          sms: {
            messageTemplate: ['Hey! Découvrez : %s\n%s', ['name', 'url']]
          }
        },
        contact: {
          fields: ['contactTel', 'contactMobile']
        }
      },
      visits: {
        type: "visits",
        text: 'VISITS',
        orderby: 'real_distance',
        useTwitter: true,
        useFacebook: true,
        item: {
          templateUrl: 'templates/visits/show.html'
        },
        listItem: {
          templateUrl: 'templates/visits/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/hotel/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/visits/mappopup.html',
          markerIcon: "leaf",
          markerColor: "green"
        },
        filters: {
          templateUrl: 'templates/visits/filters.html'
        },

        socialshare: {
          facebook: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          twitter: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          pinterest: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          instagram: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          email: {
            subjectTemplate: ['ecreate sharing', []],
            messageTemplate: ['%s', ['name']]
          },
          sms: {
            messageTemplate: ['Hey! Découvrez : %s\n%s', ['name', 'url']]
          }
        },
        contact: {
          fields: ['contactTel', 'contactMobile']
        }
      },
      information: {
        type: "information",
        text: 'INFORMATION',
        orderby: 'real_distance',
        useTwitter: false,
        useFacebook: false,
        item: {
          templateUrl: 'templates/visits/show.html'
        },
        listItem: {
          templateUrl: 'templates/visits/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/hotel/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/visits/mappopup.html',
          markerIcon: "leaf",
          markerColor: "green"
        },
        filters: {
          templateUrl: 'templates/visits/filters.html'
        }},

      stores: {
        type: "stores",
        text: 'STORES',
        orderby: 'real_distance',
        useTwitter: true,
        useFacebook: true,
        item: {
          templateUrl: 'templates/stores/show.html'
        },
        listItem: {
          templateUrl: 'templates/stores/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/stores/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/stores/mappopup.html',
          markerIcon: "leaf",
          markerColor: "green"
        },
        filters: {
          templateUrl: 'templates/stores/filters.html'
        },
        socialshare: {
          facebook: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          twitter: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          pinterest: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          instagram: {
            messageTemplate: ['Découvrez %s', ['name']],
            imageTemplate: ['%s', ['img']],
            urlTemplate: ['%s', ['url']]
          },
          email: {
            subjectTemplate: ['ecreate sharing', []],
            messageTemplate: ['%s', ['name']]
          },
          sms: {
            messageTemplate: ['Hey! Découvrez : %s\n%s', ['name', 'url']]
          }
        },
        contact: {
          fields: ['contactTel', 'contactMobile']
        }
      },
      ugc: {
        type: "ugc",
        text: 'UGCS',
        orderby: 'real_distance',
        item: {
          templateUrl: 'templates/ugc/show.html'
        },
        listItem: {
          templateUrl: 'templates/ugc/item.html'
        },
        listFavoriteItem: {
          templateUrl: 'templates/ugc/favorite-item.html'
        },
        map: {
          popupTemplateUrl: 'templates/ugc/mappopup.html',
          markerIcon: "leaf",
          markerColor: "green"
        },
        contact: {
          fields: ['contactTel', 'contactMobile']
        }
      }
    })
  ;
})();
