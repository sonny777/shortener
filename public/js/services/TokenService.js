'use strict';

var services = angular.module('services');

services.factory('TokenService', ['$http', function($http) {
    return {
        getTokenByUserId: function(userId) {
            var params = {
                'userId': userId
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/oauth/byUserId',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        },
        getRefreshTokenByUserId: function(userId) {
            var params = {
                'userId': userId
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/oauth/refreshTokenByUserId',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        },
        getToken: function() {
            var params = {
                'grant_type': 'password',
                'client_id': username.value,
                'client_secret': password.value,
                'username': username.value,
                'password': password.value
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/oauth/token',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        },
        refreshToken: function(refreshToken, user) {
            var params = {
                'grant_type': 'refresh_token',
                'client_id': user.username,
                'client_secret': user.password,
                'refresh_token': refreshToken
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/oauth/token',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        }
    }
}]);