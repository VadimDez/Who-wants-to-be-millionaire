/**
 * Created by Vadym on 19/12/14.
 */
"use strict";

angular.module('endGameCtrl', [
    'ui.bootstrap',
    'playerService'
]).controller('EndGameController', ['$scope', '$modalInstance', 'name', 'points', 'won', 'Player', function ($scope, $modalInstance, name, points, won, Player) {

    $scope.won = won;
    Player.create(name, points);

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);