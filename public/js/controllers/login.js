var views = angular.module('sm.login', ['ngStorage', 'ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/views/login.html',
        controller: 'loginCtrl'
    });
}]);

views.controller('loginCtrl', ['$scope', '$http', '$state', 'TokenService', 'UserService', '$rootScope', '$localStorage', '$timeout',
    function ($scope, $http, $state, TokenService, UserService, $rootScope, $localStorage, $timeout) {
        //need debug
        $rootScope.loggedIn = $localStorage.userId;
        $scope.getToken = function () {
            TokenService.getToken()
                .success(function (data, status) {
                    $scope.token = data;
                    UserService.getUserByName().success(function (data, status) {
                        var userId = data.user._id;
                        $localStorage.userId = userId;
                        $rootScope.rootUserId = userId;
                    });
                    $state.go('links');
                    $rootScope.loggedIn = data;
                }).
                error(function (data, status) {
                    $scope.authorizationError = 'Authorization failed.';
                });
        };

    }]);