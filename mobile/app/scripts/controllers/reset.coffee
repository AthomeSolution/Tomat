'use strict'

angular.module 'EcreateIonic.controllers.reset', []
.controller 'ResetCtrl', class
  constructor: (@$scope, @baasbox, @persist, @localize) ->

  progressFn: (self, msg) ->
    self.$scope.progressionMessage = msg
    (value) ->
      self.$scope.progressionValue = value

  cleanAndRefresh: (self)->
    console.log 'RESET: Cleaning data'
    self.progressFn self, @localize.getLocalizedString('Cleaning data...')
    self.persist.clean()
    console.log 'RESET: Refreshing data'
    self.persist.refresh @progressFn self, @localize.getLocalizedString('Refreshing data...')

  cacheImages: (self) ->
    console.log 'RESET: Caching images'
    self.persist.cacheImages (self.progressFn self, @localize.getLocalizedString('Caching images...'))
    .then (self.progressFn self, 'Done')

  doReset: ->
    self = @
    promise = promiseUtils.flatMap (@baasbox.login 'admin', 'admin'), () ->
      self.cleanAndRefresh self
    promise.then ->
      self.cacheImages self

  doResetImageCache: ->
    @persist.cleanImages()
