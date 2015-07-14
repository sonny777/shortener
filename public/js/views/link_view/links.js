'use strict';

var views = angular.module('sm.links', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('links', {
        url: '/links',
        templateUrl: 'js/views/link_view/links.html',
        controller: 'linksCtrl'
    })
}]);

views.controller('linksCtrl', ['$scope', '$http', '$window', 'UserService', 'UrlService', function ($scope, $http, $window, UserService, UrlService) {

    UrlService.getUrls().success(function (data, status) {
        $scope.urls = data;
    });

    $scope.createUrl = function() {
        UrlService.createUrl().success(function (data, status) {
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