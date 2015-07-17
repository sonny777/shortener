'use strict';

var services = angular.module('services', []);

services.factory('UserService', ['$http', function($http) {
    return {
        getUserById: function(userId) {
            var params = {
                'userId': userId
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/users/byId',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        },
        getUserByName: function() {
            var params = {
                'username': username.value
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/users/byName',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        },
        getUsers: function() {
            return $http.get('/api/users', {
            });
        },
        createUser: function() {
            var params = {
                'username': username.value,
                'password': password.value
            };
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/users/post',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        }
    }
}]);