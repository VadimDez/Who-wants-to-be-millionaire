/**
 * Created by Vadym on 19/12/14.
 */
"use strict";

angular.module('EndGameController', ['ui.bootstrap']).controller('EndGameCtrl', ['$scope', '$modalInstance', 'won', function ($scope, $modalInstance, won) {

    $scope.won = won;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);