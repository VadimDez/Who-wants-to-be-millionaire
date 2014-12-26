/**
 * Created by Vadym on 25/12/14.
 */
angular.module('playerService', []).factory('Player', ['$http', function ($http) {
    return {
        create: function (name, points) {
            return $http.post('/api/player', {
                name: name,
                points: points
            });
        },
        get16: function () {
            return $http.get('/api/player');
        }
    };
}]);