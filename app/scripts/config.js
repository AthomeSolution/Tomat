(function () {
    'use strict';

    angular.module('backendInterfaceApp')
        .value('config', {
            url: 'http://192.168.0.29:9001',
            //url: 'http://localhost:9001',
            appcode: '1234567890'
        }
    );
})();