/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular.module('IndexController', ['PlayerFilter']).controller('IndexCtrl', ['$scope', 'NameFilter', function ($scope, NameFilter) {
    $scope.playerName = '';
    var gameEngine;

    $scope.newGame = function () {
        if (NameFilter($scope.playerName)) {
            $('#wrapper').fadeOut(1000);
            gameEngine = new GameEngine();
            gameEngine.nextQuestion();
        }
    };
    $scope.leaderBoard = function () {
        $('#leaderboard-screen').fadeIn(1000);
    };
    $scope.leaderBoardBack = function () {
        $('#leaderboard-screen').fadeOut(1000);
    };
}]);