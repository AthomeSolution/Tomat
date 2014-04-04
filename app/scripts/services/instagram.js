angular.module('backendInterfaceApp').factory('instagram', function($http,config){
    return {
        fetchPopular: function(locationId,callback){
            if(!locationId)
                locationId = 3000299;
            var endPoint = "https://api.instagram.com/v1/locations/"+locationId+"/media/recent?client_id="+config.instagramClientId+"&callback=JSON_CALLBACK";

            $http.jsonp(endPoint).success(function(response){
                callback(response.data);
            });
        },

        getClosestLocation: function(lat,long,callback){
            var endPoint = "https://api.instagram.com/v1/locations/search?lat="+lat+"&lng="+long+"&client_id="+config.instagramClientId+"&callback=JSON_CALLBACK&distance=5000";

            $http.jsonp(endPoint).success(function(response){
                callback(response.data);
            });
        }


    }

});