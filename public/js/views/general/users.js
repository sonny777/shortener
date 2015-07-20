var views = angular.module('sm.users', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'js/views/general/users.html',
        controller: 'usersCtrl'
    });
}]);

views.controller('usersCtrl', ['$scope', '$http', 'UserService', 'TokenService', '$rootScope', function ($scope, $http, UserService, TokenService, $rootScope) {
    TokenService.getTokenByUserId($rootScope.loggedIn).success(function (data, status) {
        UserService.getUsers(data.accessToken.token).success(function (data, status) {
            $scope.users = data;
        });
    });
}]);