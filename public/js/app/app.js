/**
 * Created by Vadym on 16/12/14.
 */
"use strict";
angular.module('Millionaire', [
    'ngRoute',
    'audioCtrl',
    'indexCtrl',
    'leaderBoardCtrl',
    'addCtrl'
]).config(['$routeProvider', '$locationProvider',  function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        })
        .when('/leaderboard', {
            templateUrl: 'views/leaderBoard.html',
            controller: 'LeaderBoardController'
        })
        .when('/add', {
            templateUrl: 'views/add.html',
            controller: 'AddController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);