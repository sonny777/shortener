'use strict';

var services = angular.module('services');

services.factory('UrlService', ['$http', function($http) {
    return {
        getUrlsByUserId: function(userId) {
            return $http.get('/api/links/byUserId', {
                params: {
                    'userId': userId
                }
            });
        },
        getUrls: function() {
            return $http.get('/api/links', {
            });
        },
        getUrlByShortValue: function(shortValue) {
            var params = {
                'shortValue': shortValue
            }
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/byShortValue',
                data:  data,
                headers: { 'Content-Type': 'application/json' }
            })
        },
        createUrl: function(tags, userId) {
            var params = {
                'fullValue': longValue.value,
                'description' : description.value,
                'tags': angular.toJson(tags),
                'hopCount': 0,
                'userId' : userId
            };
            debugger;
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/post',
                data:  data,
                headers: { 'Content-Type': 'application/json'/*, 'Authorization': 'Bearer bfda5fbfd1d6e383740168fe0196ae960b35d1112a54023d9641013269336204'*/ }
            })
        }
    }
}]);