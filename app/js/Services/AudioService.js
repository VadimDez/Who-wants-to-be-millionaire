/**
 * Created by Vadym on 25/12/14.
 */
angular.module('AudioPlayerModule', [])
    .value("AudioPlayer",{})
    .controller('AudioPlayerCtrl', function($scope, ngAudio) {
        $scope.audios = [
            ngAudio.load('/audio/Page_Turn.wav'),
            ngAudio.load('/audio/Blop.wav')
        ];
    });