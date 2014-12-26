/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular
    .module('indexCtrl', [
        'playerFilter',
        'questionService',
        'ui.bootstrap',
        'ngAudio',
        'audioPlayerModule',
        'endGameCtrl',
        'helpCtrl'
    ])
    .controller('IndexController', ['$scope', 'NameFilter', 'Question', '$modal', 'ngAudio', 'AudioPlayer', function ($scope, NameFilter, Question, $modal, ngAudio, AudioPlayer) {
        $scope.playerName = '';
        setVars();

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
                setVars();
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
                templateUrl: (won) ? '/views/modals/won.html' : '/views/modals/lost.html',
                controller: 'EndGameController',
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

        /**
         * Set answer availability
         * @param {boolean} value
         */
        function setAllAnswersAvailable(value) {
            $scope.showA = $scope.showB = $scope.showC = $scope.showD = value;
        }

        /**
         * Set new game vars
         */
        function setVars() {
            $scope.level = 0;
            $scope.hideNewGame = false;
            $scope.helpHalfAvailable = true;
            $scope.helpCallAvailable = true;
            $scope.helpVoteAvailable = true;
        }

        /**
         * 50:50 help
         * @returns {boolean}
         */
        $scope.helpHalf = function () {
            if (!question || !$scope.helpHalfAvailable)
                return false;

            $scope.helpHalfAvailable = false;

            var correct = [window.atob(question.correctAnswer)],
                answers = ['A','B','C','D'];
            answers.splice($.inArray(window.atob(question.correctAnswer), answers), 1); // remove correct
            correct.push(answers[Math.floor(Math.random() * 3)]); // push random
            setAllAnswersAvailable(false); // disable all answers

            for (var c=0; c < 2; c++) // make correct & one random answer available
                $scope['show' + correct[c]] = true;
        };

        $scope.helpCall = function () {
            if (!question || !$scope.helpCallAvailable)
                return false;

            $scope.helpCallAvailable = false;

            var modalInstance = $modal.open({
                templateUrl: '/views/modals/help.html',
                controller: 'HelpController',
                size: 'md',
                resolve: {
                    name: function () {
                        return $scope.playerName;
                    },
                    answer: function () {
                        return window.atob(question.correctAnswer);
                    },
                    type: function () {
                        return 'call'
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                // dismissed
            });
        };

        $scope.helpVote = function() {
            if (!question || !$scope.helpVoteAvailable)
                return false;

            $scope.helpVoteAvailable = false;

            var modalInstance = $modal.open({
                templateUrl: '/views/modals/help.html',
                controller: 'HelpController',
                size: 'md',
                resolve: {
                    name: function () {
                        return $scope.playerName;
                    },
                    answer: function () {
                        return window.atob(question.correctAnswer);
                    },
                    type: function () {
                        return 'vote'
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                // dismissed
            });
        }
}]);