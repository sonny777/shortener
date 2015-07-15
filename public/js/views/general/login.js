'use strict';

var views = angular.module('sm.login', ['ngStorage', 'ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/views/general/login.html',
        controller: 'loginCtrl'
    })
}]);

views.controller('loginCtrl', ['$scope', '$http', '$state', 'TokenService', 'UserService', '$rootScope', '$localStorage',
    function ($scope, $http, $state, TokenService, UserService, $rootScope, $localStorage) {
        $rootScope.loggedIn = $localStorage.userId;
            $scope.getToken = function () {
                TokenService.getToken()
                    .success(function (data, status) {
                        console.log('Authorization success.');
                        $scope.token = data;
                        UserService.getUserByName().success(function (data, status) {
                            var userId = data.user._id;
                            $localStorage.userId = userId;
                            console.log('User find with id ' + userId);
                        });
                        $state.go('links');
                        $rootScope.loggedIn = data;
                    }).
                    error(function (data, status) {
                        console.log('Authorization failed.');
                    });
            };
    }]);
