'use strict'

angular.module 'EcreateIonic'
.factory 'camera', ($q, $rootScope) ->
  {
    getPicture:  ->
      deferred = $q.defer()
      success = (imgData) ->
        $rootScope.$apply -> deferred.resolve imgData
      fail = (imgData) ->
        $rootScope.$apply -> deferred.reject imgData

      if navigator.camera?
      then @getPictureCordova success, fail
      else @getPictureBrowser success, fail
      deferred.promise

    getPictureBrowser: (success, fail) ->
      fileInput = document.createElement 'input'
      fileInput.setAttribute 'type', 'file'
      fileInput.setAttribute 'accept', 'image/*'
      fileInput.setAttribute 'capture', true

      fileInput.onchange = ->
        if fileInput.files.length > 0
          reader = new FileReader()
          reader.readAsDataURL fileInput.files[0]
          reader.onloadend = -> success reader.result
        else
          fail 'No image found'
      fileInput.click()

    getPictureCordova: (success, fail) ->
      encodedSuccess = (imgData) ->
        success 'data:image/jpeg;base64,' + imgData
      navigator.camera.getPicture encodedSuccess, fail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: false,
      }
  }
