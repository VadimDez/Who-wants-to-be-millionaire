/**
 * Created by Vadym on 24/12/14.
 */
angular
    .module('AudioController', ['ngAudio'])
    .controller('AudioCtrl', ['$scope', 'ngAudio', function ($scope, ngAudio) {
        $scope.turned = false;
        $scope.music = ngAudio.load('/audio/background.mp3');
        $scope.music.volume = 0.5;
        $scope.music.loop = true;
        //$scope.music.play();

        // turn off
        $scope.turnOff = function () {
            $scope.music.pause();
            $scope.turned = false;
        };

        // turn on
        $scope.turnOn = function () {
            $scope.music.play();
            $scope.turned = true;
        };
}]);