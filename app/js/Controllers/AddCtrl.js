/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular
    .module('addCtrl', ['questionService', 'ngAnimate'])
    .controller('AddController', ['$scope', 'Question', function ($scope, Question) {
        $scope.correctAnswer = 'A'; // default
        $scope.added = false;

        $scope.add = function () {
            if (!check())
                return false;

            Question.create({
                question: $scope.question,
                answerA: $scope.answerA,
                answerB: $scope.answerB,
                answerC: $scope.answerC,
                answerD: $scope.answerD,
                correctAnswer: $scope.correctAnswer
            }).success(function () {
                $scope.added = true;
            });
        };

        /**
         * Clear fields
         */
        $scope.addMore = function () {
            $scope.added = false;
            $scope.question = $scope.answerA = $scope.answerB = $scope.answerC = $scope.answerD = '';
            $scope.correctAnswer = 'A';
        };

        /**
         * Check if fields aren't empty
         * @returns {boolean}
         */
        function check() {
            return !($scope.question.length == 0 || $scope.answerA.length == 0 || $scope.answerB.length == 0 || $scope.answerC.length == 0 || $scope.answerD.length == 0)
        }
}]);