var views = angular.module('sm.links', ['ui.router', 'services', 'ngTagsInput']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('links', {
        url: '/links',
        templateUrl: 'js/views/links.html',
        controller: 'linksCtrl'
    });
}]);

views.controller('linksCtrl', ['$scope', '$http', '$window', 'TokenService', 'UserService', 'UrlService', '$rootScope', function ($scope, $http, $window, TokenService, UserService, UrlService, $rootScope) {

    var token = null;
    var userId = '';
    if ( angular.isObject($rootScope.loggedIn)) {
        userId = $rootScope.rootUserId;
    } else {
        userId = $rootScope.loggedIn;
    }
    TokenService.getTokenByUserId(userId).success(function (data, status) {
        token = data.accessToken.token;
        UrlService.getUrlsByUserId(userId, token).success(function (data, status) {
            $scope.urls = data;
        });
    });

    // create url
    $scope.createUrl = function() {
        UrlService.createUrl($scope.tags, userId, token).success(function (data, status) {
            UrlService.getUrlsByUserId(userId, token).success(function (data, status) {
                $scope.urls = data;
            });
        });
    };

    // redirect to full url
    $scope.redirect = function(shortValue) {
        UrlService.getUrlByShortValue(shortValue).success(function (data, status) {
            $scope.urlObject = data;
            var newUrl = data.link.fullValue;
            $window.location.href = newUrl;
            UrlService.updateUrlHopCount(data.link._id);
        });
    };

    // update url info
    $scope.updateUrl = function() {
        UrlService.updateUrl($scope.selectedValue, $scope.urls, $scope.tags, $scope.vm.link, userId, token).success(function (data, status) {
            UrlService.getUrlsByUserId(userId, token).success(function (data, status) {
                $scope.urls = data;
            });
            $scope.longValue = '';
            $scope.description = '';
            $scope.tags = '';
            $scope.selectedValue = false;
        });
    };

    // delete url
    $scope.deleteUrl = function() {
        UrlService.deleteUrl($scope.selectedValue, token).success(function (data, status) {
            UrlService.getUrlsByUserId(userId, token).success(function (data, status) {
                $scope.urls = data;
                $scope.selectedValue = false;
            });
        });
    };

}]);