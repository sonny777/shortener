'use strict';

var views = angular.module('sm.detailUrls', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('detailUrl', {
        url: '/urls/:urlId',
        templateUrl: 'js/views/link_view/detailUrl.html',
        controller: 'detailUrlCtrl'
    })
}]);

views.controller('detailUrlCtrl', ['$scope', '$http', '$stateParams', '$window', 'UserService', 'UrlService', '$rootScope', function ($scope, $http, $stateParams, $window, UserService, UrlService, $rootScope) {

    $scope.showSearchByTag = false;

    UrlService.getUrlById($stateParams.urlId).success(function (data, status) {
        $scope.url = data;
        $scope.description = data.link.description;
        $scope.fullValue = data.link.fullValue;
        $scope.shortValue = data.link.shortValue;
        $scope.hopCount = data.link.hopCount;
        $scope.tags = data.link.tags;
        $scope.userId = data.link.userId;
    });

    $scope.searchByTag = function() {
        UrlService.getByTag($scope.url.link.tags[0]).success(function (data, status) {
            $scope.urlsByTag = data.link;
            $scope.showSearchByTag = true;
        });
    };

    // redirect to full url
    $scope.redirect = function(shortValue) {
        UrlService.getUrlByShortValue(shortValue).success(function (data, status) {
            debugger;
            $scope.urlObject = data;
            var newUrl = data.link.fullValue;
            $window.location.href = newUrl;
        });
    };

}]);