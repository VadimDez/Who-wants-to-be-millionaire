/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular.module('Millionaire', [
    'ngRoute'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/index.html',
                controller: 'IndexCtrl'
            })
            .when('/leaderboard', {
                templateUrl: 'templates/leaderBoard.html',
                controller: 'LeaderBoardCtrl'
            })
            .when('/add', {
                templateUrl: 'templates/add.html',
                controller: 'AddCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);