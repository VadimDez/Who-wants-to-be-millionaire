/**
 * Created by Vadym on 17/12/14.
 */
angular.module('questionService', []).factory('Question', ['$http', function ($http) {
    return {
        create: function (questionData) {
            return $http.post('/api/question', questionData);
        },

        get15: function () {
            return $http.get('/api/question/get15');
        }
    }
}]);