'use strict'

angular.module 'EcreateIonic'
    .factory 'persist', ($window, $rootScope, baasbox, db, offlineCollections, $q, config) ->
        $window.storedCollections = []
        $window.imgToCache = []

        db.init() if db?
        {
            cacheImages: (progress) ->
              deferred = $q.defer()
              if $window.imgToCache.length <= 0
                console.log 'PERSIST images: Nothing to cache'
                deferred.resolve 'Nothing to do'
                return deferred.promise

              console.log 'PERSIST images: Caching ' + $window.imgToCache.length + ' images'
              count = $window.imgToCache.length * config.imageSizes.length
              step = 100 / count
              progression = 0
              n = 0
              for size in config.imageSizes
                for src in $window.imgToCache
                  if n == (count - 1)
                    ImgCache.cacheFile (ImgUtils.resizeUrl src, size), -> deferred.resolve 'Done'
                  else
                    ImgCache.cacheFile (ImgUtils.resizeUrl src, size)
                  progression += step
                  progress progression if progress?
                  ++n
              return deferred.promise
            clean: ->
              if db
                $window.storedCollections = []
                $window.imgToCache = []
                db.clean()
            cleanImages: (success) ->
              console.log 'PERSIST images: Deleting cache'
              ImgCache.clearCache success
            get: (collection, uid) ->
               callback = (result) ->
                   JSON.parse result.rows.item(0).value if result.rows.length > 0
               if @shouldBeInDB collection
               then db.get collection, 'uid = ?', uid, callback
               else baasbox.getDocument collection, uid
            list: (collection, query, params) ->
                callback = (result) ->
                    JSON.parse result.rows.item(i).value for i in [0...result.rows.length]
                if @shouldBeInDB collection
                then db.get collection, query, params, callback
                else baasbox.listDocuments collection, query, params
            refresh: (progress) ->
              deferred = $q.defer()
              if not db?
                $rootScope.done()
                return deferred.resolve 'KO'
              return console.log 'PERSIST error: No Baasbox session'  if not baasbox.loggedIn
              count = 0
              collectionCount = offlineCollections.length
              dbCallback = ->
                count = count - 1
                if count == 0 && collectionCount == 0
                    $rootScope.done()
                    deferred.resolve 'OK'
              db.init()

              step = 100 / (collectionCount + 1)
              progression = 0
              for collection in offlineCollections
                  callback = (collection) -> (data) ->
                      console.log 'PERSIST offline: ' + collection + ' - ' + data.length + ' items'
                      count = count + data.length
                      for it in data
                        publicationEnd = null
                        if (it.endPublication)
                          publicationEnd = new Date(it.endPublication).getTime()
                        db.put collection, it.id, it.type, it.lat, it.lng, publicationEnd, it, dbCallback
                        $window.imgToCache.push it.img if it.img?
                      $window.storedCollections.push collection
                      collectionCount = collectionCount - 1
                      progression += step
                      progress progression if progress?
                  baasbox.listDocuments collection
                      .then callback collection
              deferred.promise
            stored: () ->
              deferred = $q.defer()
              if db?
                callback = (res) ->
                  ret = res.rows.item(0)['count(*)'] > 0
                  if(ret)
                    $rootScope.done()
                    callback = (result) ->
                      $window.storedCollections.push result.rows.item(i).collection for i in [0...result.rows.length]
                      deferred.resolve ret
                    db.query 'SELECT DISTINCT collection FROM documents', [], callback
                  else
                    deferred.resolve(ret)
                db.count().then callback
              else
                $rootScope.done()
                deferred.resolve false
              deferred.promise
            shouldBeInDB: (collection) ->
              db? and collection in $window.storedCollections
        }
