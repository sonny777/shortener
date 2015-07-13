'use strict';

var services = angular.module('services');

services.factory('ClientService', ['$http', function($http) {
    return {
        getClients: function() {
            return $http.get('/api/clients', {
            });
        },
        createClient: function() {
            var params = {
                'name': username.value,
                'clientId': username.value,
                'clientSecret' : password.value
            }
            debugger;
            var data = JSON.stringify(params);
            return $http({
                method: 'POST',
                url: '/api/clients/post',
                data:  data,
                headers: {'Content-Type': 'application/json'}
            })
        }
    }
}]);