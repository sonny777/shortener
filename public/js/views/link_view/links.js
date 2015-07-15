'use strict';

var views = angular.module('sm.links', ['ui.router', 'services', 'ngTagsInput']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('links', {
        url: '/links',
        templateUrl: 'js/views/link_view/links.html',
        controller: 'linksCtrl'
    })
}]);

views.controller('linksCtrl', ['$scope', '$http', '$window', 'UserService', 'UrlService', '$rootScope', function ($scope, $http, $window, UserService, UrlService, $rootScope) {

    /*$scope.loadTags = function(query) {
        return $http.get('/tags?query=' + query);
    };*/

    var userId = '';
    if ( angular.isObject($rootScope.loggedIn)) {
        userId = $rootScope.rootUserId;
    } else {
        userId = $rootScope.loggedIn;
    }
    UrlService.getUrlsByUserId(userId).success(function (data, status) {
        $scope.urls = data;
    });

    $scope.createUrl = function() {
        UrlService.createUrl($scope.tags, userId).success(function (data, status) {
            $scope.urls = data;
        });
    };

    $scope.redirect = function(shortValue) {
        UrlService.getUrlByShortValue(shortValue).success(function (data, status) {
            $scope.urlObject = data;
            var newUrl = data.link.fullValue;
            $window.location.href = newUrl;
        });
    }

    UserService.getUsers().success(function (data, status) {
        $scope.users = data;
    });
}]);