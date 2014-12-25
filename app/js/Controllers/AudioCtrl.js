/**
 * Created by Vadym on 24/12/14.
 */
angular
    .module('AudioController', [
        'ngAudio',
        'AudioPlayerModule'
    ])
    .controller('AudioCtrl', ['$scope', 'ngAudio', 'AudioPlayer', function ($scope, ngAudio, AudioPlayer) {
        $scope.turned = false;
        var url = '/audio/background.mp3';

        if (AudioPlayer[url]) {
            $scope.music = AudioPlayer[url];
        } else {
            $scope.music = ngAudio.load(url);
            $scope.music.volume = 0.5;
            $scope.music.loop = true;
            AudioPlayer[url] = $scope.music;
        }

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