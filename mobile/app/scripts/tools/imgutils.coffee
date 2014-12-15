ImgUtils = {
  resizeUrl: (url, size) ->
    urlParts = url.split '?'
    urlParts[0] + '/resizeId/' + size + '?' + urlParts[1]
}

window.ImgUtils = ImgUtils
