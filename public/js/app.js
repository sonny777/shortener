'use strict';

var app = angular.module('sm', ['ui.router', 'sm.register', 'sm.login', 'sm.users', 'sm.links', 'services']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
});