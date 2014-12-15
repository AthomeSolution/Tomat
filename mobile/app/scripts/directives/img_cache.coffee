'use strict'

angular.module 'EcreateIonic'
.directive 'ngCache', () ->
  {
  restrict: 'A',
  link: (scope, el, attrs) ->
    attrs.$observe 'ngUrl', (src) ->
      size = attrs.ngSizeid
      size = 0 if !size
      url = ImgUtils.resizeUrl(src,size)
      el.attr 'src', url
      ImgCache.isCached url, (path, success) ->
        if success
          # console.log 'IMAGE cache: cache -> ' + url
          ImgCache.useCachedFileWithSource el, url
        else
          # console.log 'IMAGE cache: remote -> ' + url
          ImgCache.cacheFile url, () ->
            ImgCache.useCachedFileWithSource el, url
  }
