(function () {
    'use strict';

    angular.module('backendInterfaceApp')
        .value('config', {
            //url: 'http://toolbox.baasbox.demos.athome-solution.fr',
            url: 'http://localhost:9000',
            appcode: '1234567890',
            instagramClientId: 'd9a1295c86da4fdf86f4498fb04c4b10',
            useInstagram:false,
            langs:["fr","en"]
        }
    );
})();