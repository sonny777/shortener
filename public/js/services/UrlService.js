/*'use strict';*/

var services = angular.module('services');

services.factory('UrlService', ['$http', function($http) {
    return {
        getUrlsByUserId: function(userId, token) {
            var params = {
                'userId': userId
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/links/byUserId',
                data: data,
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            });
        },
        getUrls: function() {
            return $http({
                method: 'POST',
                url: '/api/links',
                headers: { 'Content-Type': 'application/json' }
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
            });
        },
        getByTag: function(tag) {
            var params = {
                'tag': tag
            };
            return $http({
                method: 'POST',
                url: '/api/links/byTag',
                data:  params,
                headers: { 'Content-Type': 'application/json' }
            });
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
            });
        },
        createUrl: function(tags, userId, token) {
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
                url: '/api/links/create',
                data:  data,
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            });
        },
        updateUrl: function(linkId, urls, tags, link, userId, token) {
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
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            });
        },
        deleteUrl: function(linkId, token) {
            return $http.delete('/api/links/delete', {
                params: {
                    'linkId': linkId
                },
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            });
        },
        updateUrlHopCount: function(linkId) {
            return $http({
                params: {
                    'linkId': linkId
                },
                method: 'PUT',
                url: '/api/links/updateHopCount',
                headers: { 'Content-Type': 'application/json' }
            });
        }
    };
}]);