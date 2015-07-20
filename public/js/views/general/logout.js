var views = angular.module('sm.logout', ['ngStorage', 'ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('logout', {
        url: '/logout',
        templateUrl: 'js/views/general/logout.html',
        controller: 'logoutCtrl'
    });
}]);

views.controller('logoutCtrl', ['$scope', '$http', '$state', '$rootScope', '$localStorage',
    function ($scope, $http, $state, $rootScope, $localStorage) {
        $rootScope.loggedIn = false;
        $localStorage.userId = '';
        $state.go('login');
}]);