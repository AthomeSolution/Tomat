(function () {
    'use strict';

    angular.module('backendInterfaceApp')
        .value('config', {
            url: 'http://192.168.0.29:9001',
            //url: 'http://localhost:9001',
            appcode: '1234567890',
            instagramClientId: 'd9a1295c86da4fdf86f4498fb04c4b10',
            useInstagram:false
        }
    );
})();