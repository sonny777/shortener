'use strict';

var views = angular.module('sm.register', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/views/general/register.html',
        controller: 'registerCtrl'
    })
}]);

views.controller('registerCtrl', ['$scope', '$http', 'UserService', 'ClientService', function ($scope, $http, UserService, ClientService) {
    $scope.createUser = function() {
        UserService.createUser().success(function (data, status) {
            $scope.users = data;
        });
        ClientService.createClient().success(function (data, status) {
            $scope.clients = data;
        });
    };
    UserService.getUsers().success(function (data, status) {
        $scope.register = data;
    });
}]);