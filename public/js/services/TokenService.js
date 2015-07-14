'use strict';

var services = angular.module('services');

services.factory('TokenService', ['$http', function($http) {
    return {
        getToken: function() {
            var params = {
                'grant_type': 'password',
                    'client_id': username.value,
                    'client_secret': password.value,
                    'username': username.value,
                    'password': password.value
            }
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/oauth/token',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        },
        refreshToken: function(refreshToken) {
            var params = {
                'grant_type': 'refresh_token',
                'client_id': username.value,
                'client_secret': password.value,
                'refresh_token': refreshToken
            }
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