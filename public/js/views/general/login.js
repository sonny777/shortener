'use strict';

var views = angular.module('sm.login', ['ngStorage', 'ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/views/general/login.html',
        controller: 'loginCtrl'
    })
}]);

views.controller('loginCtrl', ['$scope', '$http', '$state', 'TokenService', 'UserService', '$rootScope', '$localStorage', '$timeout',
    function ($scope, $http, $state, TokenService, UserService, $rootScope, $localStorage, $timeout) {
        $rootScope.loggedIn = $localStorage.userId;
            $scope.getToken = function () {
                TokenService.getToken()
                    .success(function (data, status) {
                        console.log('Authorization success.');
                        $scope.token = data;
                        UserService.getUserByName().success(function (data, status) {
                            var userId = data.user._id;
                            $localStorage.userId = userId;
                            $rootScope.rootUserId = userId; //!!!!!
                            console.log('User find with id ' + userId);
                        });
                        $state.go('links');
                        $rootScope.loggedIn = data;
                    }).
                    error(function (data, status) {
                        console.log('Authorization failed.');
                    });
            };

        /*-- Automatically start poller1 on page load --*/
        /*var user = null;
        var refreshToken = null;
        $timeout(TokenService.getRefreshTokenByUserId($localStorage.userId).success(function (data, status) {
            refreshToken = data.refreshToken.token;
            UserService.getUserById($localStorage.userId).success(function (data, status) {
                user = data.user;
                TokenService.refreshToken(refreshToken, user).success(function (data, status) {
                    console.log('Refresh token success.');
                });
            });
        }), 3600);*/

    }]);
