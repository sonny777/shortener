var views = angular.module('sm.register', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'js/views/register.html',
        controller: 'registerCtrl'
    });
}]);

views.controller('registerCtrl', ['$scope', '$http', '$location', 'UserService', 'ClientService', function ($scope, $http, $location, UserService, ClientService) {
    $scope.createUser = function() {
        UserService.createUser().success(function (data, status) {
            $scope.users = data;
        });
        ClientService.createClient().success(function (data, status) {
            $scope.clients = data;
        });
        $location.path('/login');
    };
    UserService.getUsers().success(function (data, status) {
        $scope.register = data;
    });
}]);