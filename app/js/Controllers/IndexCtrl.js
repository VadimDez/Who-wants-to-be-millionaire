/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular
    .module('IndexController', [
        'PlayerFilter',
        'QuestionService',
        'ui.bootstrap',
        'ngAudio'
    ])
    .controller('IndexCtrl', ['$scope', 'NameFilter', 'Question', '$modal', 'ngAudio', function ($scope, NameFilter, Question, $modal, ngAudio) {
        $scope.playerName = '';
        $scope.hideNewGame = false;
        $scope.level = 0;
        var question = null,
            questions = null,
            available = false;

        Question.get16().success(function (_questions) {
            if (_questions.length === 16)
                available = true;
            questions = _questions;
        });

        $scope.newGame = function () {
            if (NameFilter($scope.playerName) && available) {
                $scope.hideNewGame = true;

                game();
            }
        };

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

        function game() {
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
            var modalInstance = $modal.open({
                templateUrl: (won) ? '/views/modal_won.html' : '/views/modal_lost.html',
                controller: 'EndGameCtrl',
                size: 'lg',
                resolve: {
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

}]);