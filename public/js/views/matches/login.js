'use strict';

var views = angular.module('sm.login', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/views/matches/login.html',
        controller: 'loginCtrl'
    })
}]);

views.controller('loginCtrl', ['$scope', '$http', 'UserService', function ($scope, $http, UserService) {
    UserService.getUsers().success(function (data, status) {
        $scope.users = data;
    });
}]);

