'use strict';

var app = angular.module('sm', ['ui.router', 'sm.register', 'sm.login', 'sm.logout', 'sm.users', 'sm.urls', 'sm.links', 'sm.detailUrls', 'services']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
});