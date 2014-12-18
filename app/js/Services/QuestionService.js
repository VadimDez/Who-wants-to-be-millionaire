/**
 * Created by Vadym on 17/12/14.
 */
angular.module('QuestionService', []).factory('Question', ['$http', function ($http) {
    return {
        create: function (questionData) {
            return $http.post('/api/question', questionData);
        },

        get16: function () {
            return $http.get('/api/question');
        }
    }
}]);