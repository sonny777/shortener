'use strict';

var views = angular.module('sm.login', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/views/general/login.html',
        controller: 'loginCtrl'
    })
}]);

views.controller('loginCtrl', ['$scope', '$http', 'TokenService', function ($scope, $http, TokenService) {
    $scope.getToken = function() {
        TokenService.getToken().success(function (data, status) {
            $scope.token = data;
        });
    };
}]);

