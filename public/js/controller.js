'use strict';

var myApp = angular.module('myApp', []);

//myApp.config(['$httpProvider', function($httpProvider) {
//    //$httpProvider.defaults.useXDomain = true;
//    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
//}
//]);

myApp.controller('userListCtrl', userListCtrl);

function userListCtrl($scope, $http, $templateCache) {

    var method = 'POST';
    var url = 'http://localhost:1337/api/users/post';
    var urlC = 'http://localhost:1337/api/clients/post';
    $scope.save = function() {
        var formData = {
            'username' : this.username,
            'password' : this.password
        };

        var data = JSON.stringify(formData);

        // save in users
        $http({
            method: method,
            url: url,
            data:  data,
            headers: {'Content-Type': 'application/json'},
            cache: $templateCache
        }).
            success(function(response) {
                console.log("success");
            }).
            error(function(response) {
                console.log("error");
            });

        // save in clients
        var formData = {
            'name' : this.username,
            'clientId' : this.username,
            'clientSecret' : this.password
        };
        this.username = '';
        this.password = '';

        var data = JSON.stringify(formData);
        debugger;
        $http({
            method: method,
            url: urlC,
            data:  data,
            headers: {'Content-Type': 'application/json'},
            cache: $templateCache
        }).
            success(function(response) {
                console.log("success");
            }).
            error(function(response) {
                console.log("error");
            });
        return false;
    };

}