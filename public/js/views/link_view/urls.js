var views = angular.module('sm.urls', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('urls', {
        url: '/urls',
        templateUrl: 'js/views/link_view/urls.html',
        controller: 'urlsCtrl'
    });
}]);

views.controller('urlsCtrl', ['$scope', '$http', '$window', 'UserService', 'UrlService', '$rootScope', function ($scope, $http, $window, UserService, UrlService, $rootScope) {

    UrlService.getUrls().success(function (data, status) {
        $scope.urls = data;
    });

    $scope.redirect = function(shortValue) {
        UrlService.getUrlByShortValue(shortValue).success(function (data, status) {
            $scope.urlObject = data;
            var newUrl = data.link.fullValue;
            $window.location.href = newUrl;
        });
    };

}]);