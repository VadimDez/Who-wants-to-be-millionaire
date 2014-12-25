/**
 * Created by Vadym on 19/12/14.
 */
"use strict";

angular.module('EndGameController', [
    'ui.bootstrap',
    'PlayerService'
]).controller('EndGameCtrl', ['$scope', '$modalInstance', 'name', 'points', 'won', 'Player', function ($scope, $modalInstance, name, points, won, Player) {
console.log(name);
    console.log(points);
    console.log(won);
    $scope.won = won;
    Player.create(name, points);

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);