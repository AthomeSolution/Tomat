(function () {
    'use strict';

    angular.module('backendInterfaceApp')
        .value('config', {
            url: 'http://localhost:9001',
            //url: 'http://localhost:9000',
            appcode: '1234567890'
        }
    );
})();