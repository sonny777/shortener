'use strict';

var views = angular.module('sm.users', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'js/views/general/users.html',
        controller: 'usersCtrl'
    })
}]);

views.controller('usersCtrl', ['$scope', '$http', 'UserService', function ($scope, $http, UserService) {
    UserService.getUsers().success(function (data, status) {
        $scope.users = data;
    });
}]);