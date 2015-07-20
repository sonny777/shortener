var views = angular.module('sm.detailUrls', ['ui.router', 'services']);

views.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('detailUrl', {
        url: '/urls/:urlId',
        templateUrl: 'js/views/detailUrl.html',
        controller: 'detailUrlCtrl'
    });
}]);

views.controller('detailUrlCtrl', ['$scope', '$http', '$stateParams', '$window', 'UserService', 'UrlService', '$rootScope', function ($scope, $http, $stateParams, $window, UserService, UrlService, $rootScope) {

    $scope.showSearchByTag = false;

    UrlService.getUrlById($stateParams.urlId).success(function (data, status) {
        $scope.url = data;
        $scope.description = data.link.description;
        $scope.fullValue = data.link.fullValue;
        $scope.shortValue = data.link.shortValue;
        $scope.hopCount = data.link.hopCount;
        $scope.urlTags = data.link.tags;
        $scope.userId = data.link.userId;
    });

    $scope.searchByTag = function(tag) {
        UrlService.getByTag(tag).success(function (data, status) {
            $scope.urlsByTag = data.link;
            $scope.showSearchByTag = true;
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

}]);