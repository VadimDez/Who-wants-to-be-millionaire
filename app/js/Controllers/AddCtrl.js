/**
 * Created by Vadym on 16/12/14.
 */
"use strict";

angular
    .module('AddController', ['QuestionService'])
    .controller('AddCtrl', ['$scope', 'Question', function ($scope, Question) {
        $scope.correctAnswer = 'A'; // default

        $scope.add = function () {
            Question.create({
                question: $scope.question,
                answerA: $scope.answerA,
                answerB: $scope.answerB,
                answerC: $scope.answerC,
                answerD: $scope.answerD,
                correctAnswer: $scope.correctAnswer
            }).success(function () {
                console.log('success');
            });
        };
}]);