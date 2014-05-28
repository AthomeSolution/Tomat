'use strict';

angular.module('backendInterfaceApp').directive('froala', ['$timeout', '$window', function ($timeout, $window) {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {
            //scope.element = element;

            var updateModel = function updateModel(value) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(value);
                    });
                },
                $_element = angular.element(element);

            $timeout(function () {
                $(element).editable(
                    {
                        inlineMode: false,
                        buttons: ["bold", "italic", "underline", "fontSize", "color", 'sep', "formatBlock", "align", "insertOrderedList",
                            "insertUnorderedList", "outdent", "indent", 'sep', "createLink", "insertImage", "insertVideo", "youtube", "slideshow",
                            'sep', "undo", "redo", "html" ],
                        customButtons: {
                            youtube: {
                                title: 'Insert Youtube video',
                                icon: {
                                    type: 'font',
                                    value: 'fa fa-youtube-play'
                                },
                                callback: function (editor) {
                                    var code = $window.prompt('youtube id');
                                    console.log(code);
                                    if (code != null && code != '') {
                                        editor.insertHTML('<youtube code="' + code + '"><img src="http://rich_media_gallery.commondatastorage.googleapis.com/e0e8a76b-262f-43e9-a30d-902741bee97d_yt_player.jpg"/></youtube>');
                                        $_element.editable("sync");
                                    }
                                },
                                slideshow: {
                                    title: 'Insert slideshow',
                                    icon: {
                                        type: 'font',
                                        value: 'fa fa-youtube-play'
                                    },
                                    callback: function (editor) {
                                        console.log(editor.getSelection());
                                    }
                                }
                            }
                        },
                        crossDomain: true,
                        imageUploadURL: "http://localhost:9000/upload",
                        beforeFileUploadCallback: function (files) {
                            console.log(files);
                        },
                        contentChangedCallback: function () {
                            updateModel($_element.editable("getHTML")[0]);
                        }

                    }
                );
                ngModel.$render();
            });

            ngModel.$render = function () {
                $timeout(function () {
                    $_element.editable("setHTML", ngModel.$viewValue || '', false);
                    $_element.editable("sync");
                });
            };

            /*
             scope.$watch('content', function(value) {
             $(scope.element).editable("setHTML", value, false);
             $(scope.element).editable("sync");
             }, true); */


        }
    }
}]);