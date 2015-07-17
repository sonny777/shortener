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
        getUrlById: function(urlId) {
            var params = {
                'urlId': urlId
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/byId',
                data:  data,
                headers: { 'Content-Type': 'application/json' }
            })
        },
        getByTag: function(tag) {
            var params = {
                'tag': tag
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/byTag',
                data:  data,
                headers: { 'Content-Type': 'application/json' }
            })
        },
        getUrlByShortValue: function(shortValue) {
            var params = {
                'shortValue': shortValue
            };
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
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/post',
                data:  data,
                headers: { 'Content-Type': 'application/json'/*, 'Authorization': 'Bearer bfda5fbfd1d6e383740168fe0196ae960b35d1112a54023d9641013269336204'*/ }
            })
        },
        updateUrl: function(linkId, urls, tags, link, userId) {
            var url = null;
            angular.forEach(urls, function(value, key) {
                if (value._id == linkId) {
                    url = value;
                    url.tags = tags;
                    url.description = link.description;
                    url.fullValue = link.longValue;
                    url.userId = userId;
                    return false;
                }
            });
            var params = {
                'fullValue': url.fullValue,
                'description' : url.description,
                'tags': angular.toJson(url.tags),
                'hopCount': 32,
                'userId' : url.userId
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'PUT',
                url: '/api/links/update?linkId=' + linkId,
                data:  data,
                headers: { 'Content-Type': 'application/json'/*, 'Authorization': 'Bearer bfda5fbfd1d6e383740168fe0196ae960b35d1112a54023d9641013269336204'*/ }
            })
        },
        deleteUrl: function(linkId) {
            return $http.delete('/api/links/delete', {
                params: {
                    'linkId': linkId
                }
            });
        },
        updateUrlHopCount: function(linkId) {
            return $http({
                params: {
                    'linkId': linkId
                },
                method: 'PUT',
                url: '/api/links/updateHopCount',
                //data:  data,
                headers: { 'Content-Type': 'application/json'/*, 'Authorization': 'Bearer bfda5fbfd1d6e383740168fe0196ae960b35d1112a54023d9641013269336204'*/ }
            })
        }
    }
}]);