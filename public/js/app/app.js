/**
 * Created by Vadym on 16/12/14.
 */
"use strict";
angular.module('Millionaire', [ 'ngRoute',
    'ngAudio',
    'AudioController',
    'IndexController',
    'LeaderBoardController',
    'AddController',
    'EndGameController',
    'QuestionService',
    'Directives'
]).config(['$routeProvider', '$locationProvider',  function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'IndexCtrl'
        })
        .when('/leaderboard', {
            templateUrl: 'views/leaderBoard.html',
            controller: 'LeaderBoardCtrl'
        })
        .when('/add', {
            templateUrl: 'views/add.html',
            controller: 'AddCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}])
    .value("AudioPlayer",{});