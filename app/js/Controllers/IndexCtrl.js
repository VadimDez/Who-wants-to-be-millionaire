/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular
    .module('IndexController', ['PlayerFilter'])
    .controller('IndexCtrl', ['$scope', 'NameFilter', function ($scope, NameFilter) {
        $scope.playerName = '';
        $scope.hideNewGame = false;
        var question = null;

        $scope.newGame = function () {
            if (NameFilter($scope.playerName)) {
                $scope.hideNewGame = true;

                //var gameEngine = new GameEngine();
                //gameEngine.nextQuestion();
                question = {
                    question: "asd",
                    answerA: 'answerA',
                    answerB: 'answerB',
                    answerC: 'answerC',
                    answerD: 'answerD',
                    correctAnswer: 'answerA'
                };
                $scope.question = {
                    question: "asd",
                    answerA: question.answerA,
                    answerB: question.answerB,
                    answerC: question.answerC,
                    answerD: question.answerD
                };
            }
        };

        $scope.answer = function (Letter) {

            if (question && $.inArray(Letter, ['A', 'B', 'C', 'D']) == -1 )
                return false;

            if (question['answer' + Letter] == question.correctAnswer)
                console.log('correct');

        };

}]);