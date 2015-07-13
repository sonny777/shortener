'use strict';

var services = angular.module('services');

services.factory('UserService', ['$http', function($http) {
    return {
        getUsers: function() {
            return $http.get('/api/users', {
            });
        },
        createUser: function() {
            var params = {
                'username': username.value,
                'password': password.value
            }
            var data = JSON.stringify(params);
            return $http({
                    method: 'POST',
                    url: '/api/users/post',
                    data:  data,
                    headers: {'Content-Type': 'application/json'}
                }).
                success(handleSuccess).
                error(handleError('Error creating user'));
        }
    }
}]);

function handleSuccess(data) {
    return data;
}

function handleError(error) {
    return function () {
        return { success: false, message: error };
    };
}