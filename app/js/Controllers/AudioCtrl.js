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
        var url = '/audio/background.mp3',
            music;

        if (AudioPlayer[url]) {
            music = AudioPlayer[url];
        } else {
            music = ngAudio.load(url);
            music.volume = 0.5;
            music.loop = true;
            AudioPlayer[url] = music;
        }

        // turn off
        $scope.turnOff = function () {
            music.pause();
            $scope.turned = false;
        };

        // turn on
        $scope.turnOn = function () {
            music.play();
            $scope.turned = true;
        };
}]);