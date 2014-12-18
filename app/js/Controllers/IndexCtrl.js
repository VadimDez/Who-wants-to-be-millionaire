/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular
    .module('IndexController', ['PlayerFilter', 'QuestionService'])
    .controller('IndexCtrl', ['$scope', 'NameFilter', 'Question', function ($scope, NameFilter, Question) {
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

                //var gameEngine = new GameEngine();
                //gameEngine.nextQuestion();
                game();
            }
        };

        $scope.answer = function (Letter) {

            if (question && $.inArray(Letter, ['A', 'B', 'C', 'D']) == -1 )
                return false;

            if (question['answer' + Letter] == question.correctAnswer) {
                $scope.level++;
                if ($scope.level >= 16) {
                    // won
                } else
                    game();
            } else {
                $scope.level = 0;
                game();
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
}]);