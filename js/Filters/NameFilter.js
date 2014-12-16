/**
 * Created by Vadym on 16/12/14.
 */
angular.module('Millionaire').filter('PlayerName', function () {
    return function (string) {
        if (!string)
            return false;
        string = string.trim();

        return (string.length !== 0 && string !== '');
    }
});