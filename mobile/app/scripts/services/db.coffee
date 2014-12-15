'use strict'

angular.module 'EcreateIonic'
    .factory 'db', ($q, config_db) ->
        offlineStatus = window.openDatabase?
        console.log('OFFLINE mode: ' + if offlineStatus then 'ON' else 'OFF')
        {
            db: window.openDatabase config_db.name, config_db.version, config_db.description, config_db.size

            init: ->
                sql = '''
                CREATE TABLE IF NOT EXISTS documents (
                    _id INTEGER PRIMARY KEY,
                    collection TEXT,
                    uid TEXT,
                    type TEXT,
                    lng INTEGER,
                    lat INTEGER,
                    endPublication TIMESTAMP,
                    value TEXT
                );
                '''
                @query sql
            clean: ->
                sql = 'DROP TABLE IF EXISTS documents'
                console.log 'DB clean: Dropping database'
                @query sql
            query: (query, values, callback) ->
                values = values || []
                deferred = $q.defer()
                @db.transaction (transaction) ->
                    transaction.executeSql query, values, (transaction, result) ->
                        deferred.resolve result
                    ,(transaction, err) ->
                        console.log 'DB ERROR: Query failed: ' + query + ' {' + values + '}'
                        console.log '> ' + err.message
                        deferred.reject err
                deferred.promise.then callback
            get: (collection, where, args, callback) ->
                sql = 'SELECT * FROM documents WHERE collection = ?'
                sql += ' AND ' + where if where?
                params = [collection]
                params = params.concat args if args?
                @query sql, params, callback
            count: (callback) ->
               sql = 'SELECT count(*) FROM documents'
               @query sql, '', callback
            put: (collection, uid, type, lat, lng, publicationEnd, value, callback) ->
                sql = '''
                INSERT INTO documents (
                    collection, uid, type, lat, lng, endPublication, value
                ) VALUES (?, ?, ?, ?, ?, ?, ?);
                '''
                @query sql, [collection, uid, type, lat, lng, publicationEnd, JSON.stringify value], callback
        } if offlineStatus
