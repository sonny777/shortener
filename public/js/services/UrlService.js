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
                'userId' : '559fde5bff7c6a98130c9810'
            }
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/post',
                data:  data,
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer d32fffb440063915f10ac9c785b093cf247edcd845e247a12fbffd74d11a50ce' }
            })
        }
    }
}]);