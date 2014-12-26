/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular.module('leaderBoardCtrl', ['playerService']).controller('LeaderBoardController', ['$scope', 'Player', function ($scope, Player) {
    Player.get16().success(function (_players) {
        $scope.players = _players;
    });
}]);