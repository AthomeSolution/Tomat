promiseUtils = {
  flatMap: (promise, fn) ->
    deferred = $.Deferred()
    reject = ->
      deferred.reject.apply deferred, arguments

    promise.then ->
      newPromise = fn.apply null, arguments
      newPromise.then ->
        deferred.resolve.apply(deferred, arguments)
      , reject
    , reject
    deferred.promise()
}

window.promiseUtils = promiseUtils
