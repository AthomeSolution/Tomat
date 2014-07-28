'use strict';

angular.module('backendInterfaceApp').config(function($provide){
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
        // $delegate is the taOptions we are decorating
        // register the tool with textAngular
        taRegisterTool('insertYoutube', {
            iconclass: 'fa fa-youtube-play',
            action: function(){
                var youtubeId = window.prompt('ID Youtube', '');
                //return this.$editor().wrapSelection('insertHTML', '<youtube code="'+youtubeId+'"/>', true);
                return this.$editor().wrapSelection('insertHTML', '<div class="youtube" x-code="123"/>', true);
            }
        });
        // add the button to the default toolbar definition
        taOptions.toolbar[1].push('insertYoutube');
        return taOptions;
    }]);
});