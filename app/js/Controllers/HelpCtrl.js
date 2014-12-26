/**
 * Created by Vadym on 26/12/14.
 */
"use strict";

angular.module('helpCtrl', [
    'ui.bootstrap'
]).controller('HelpController', ['$scope', '$modalInstance', 'name', 'answer', 'type', function ($scope, $modalInstance, name, answer, type) {

    var answers = ['A','B','C','D'];
    answers.splice($.inArray(answer, answers), 1);
    $scope.type = type;
    if (type == 'call') {
        $scope.name = name;
        $scope.answer = (Math.random() > 0.9) ? getRandomAnswer() : answer;
    } else {
        getRandomPercentage();
    }

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    /**
     * Get random answer
     * @returns {string}
     */
    function getRandomAnswer() {
        return answers[Math.floor(Math.random() * 3)];
    }

    /**
     * Get random percentage for Vote Help
     */
    function getRandomPercentage() {
        var percentage = 100,
            random = Math.random() * 100;
        $scope.answer = {};

        percentage -= random;
        $scope.answer[answer] = random;

        $.each(answers, function (k, value) {
            $scope.answer[value] = Math.random() * percentage;
            percentage -= $scope.answer[value];
        });
    }
}]);