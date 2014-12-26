/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular
    .module('IndexController', [
        'PlayerFilter',
        'QuestionService',
        'ui.bootstrap',
        'ngAudio',
        'AudioPlayerModule'
    ])
    .controller('IndexCtrl', ['$scope', 'NameFilter', 'Question', '$modal', 'ngAudio', 'AudioPlayer', function ($scope, NameFilter, Question, $modal, ngAudio, AudioPlayer) {
        $scope.playerName = '';
        $scope.hideNewGame = false;
        $scope.level = 0;

        var question = null,
            questions = null,
            available = false,
            soundNext = audio('/audio/Page_Turn.wav'),
            soundLose = audio('/audio/Blop.wav');

        Question.get16().success(function (_questions) {
            if (_questions.length === 16)
                available = true;

            questions = _questions;
        });

        // on new game
        $scope.newGame = function () {
            if (NameFilter($scope.playerName) && available) {
                $scope.hideNewGame = true;

                game();
            }
        };

        // on answer
        $scope.answer = function (Letter) {

            if (available && question && $.inArray(Letter, ['A', 'B', 'C', 'D']) == -1)
                return false;

            if (Letter == window.atob(question.correctAnswer)) {
                $scope.level++;
                if ($scope.level >= 16) {
                    launchModal(true); // won
                } else {
                    game();
                }
            } else {
                launchModal(false);
                $scope.level = 0;
                $scope.hideNewGame = false;
            }
        };

        // next question
        function game() {
            setAllAnswersAvailable(true);

            if (soundNext.currentTime > 0)
                soundNext.currentTime = 0;

            soundNext.play();
            question = questions[$scope.level];

            $scope.question = {
                question: question.question,
                answerA: question.answerA,
                answerB: question.answerB,
                answerC: question.answerC,
                answerD: question.answerD
            };
        }

        function launchModal(won) {
            soundLose.play();
            
            var modalInstance = $modal.open({
                templateUrl: (won) ? '/views/modal_won.html' : '/views/modal_lost.html',
                controller: 'EndGameCtrl',
                size: 'sm',
                resolve: {
                    name: function () {
                        return $scope.playerName;
                    },
                    points: function () {
                        return $scope.level;
                    },
                    won: function () {
                        return won;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                // dismissed
            });
        }

        function audio(url) {
            if (AudioPlayer[url]) {
                return AudioPlayer[url];
            } else {
                var sound = ngAudio.load(url);
                sound.volume = 0.5;
                AudioPlayer[url] = sound;
                return sound;
            }
        }

        function setAllAnswersAvailable(value) {
            $scope.showA = $scope.showB = $scope.showC = $scope.showD = value;
        }

        // help 50/50
        $scope.helpHalf = function () {
            if (!question)
                return false;

            var correct = [window.atob(question.correctAnswer)],
                answers = ['A','B','C','D'];
            answers.splice($.inArray(window.atob(question.correctAnswer), answers), 1); // remove correct
            correct.push(answers[Math.floor(Math.random() * answers.length)]); // push random
            setAllAnswersAvailable(false); // disable all answers

            for (var c=0; c < 2; c++) // make correct & one random answer available
                $scope['show' + correct[c]] = true;
        };
}]);