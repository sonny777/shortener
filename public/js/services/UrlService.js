'use strict';

var services = angular.module('services');

services.factory('UrlService', ['$http', function($http) {
    return {
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
        createUrl: function() {
            var params = {
                'fullValue': longValue.value,
                'description' : description.value,
                'tags': 'test',
                'hopCount': 0,
                'userId' : '559f8c7db6ee41200d0ab4d3'
            }
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/post',
                data:  data,
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer c1e8bd780679a497f7af038163c96c98d616e2b10f724ca575d7fd50d7723763' }
            })
        }
    }
}]);