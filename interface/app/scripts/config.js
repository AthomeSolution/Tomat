(function () {
    'use strict';

    angular.module('backendInterfaceApp')
        .value('config', {
            //url: 'http://appli.canal-du-nivernais.com:9000',
            url: 'http://localhost:9000',
            //url: '..',
            appcode: '1234567890',
            instagramClientId: 'd9a1295c86da4fdf86f4498fb04c4b10',
            useInstagram:false
        }
    );
})();
