/**
 * Created by Vadym on 16/12/14.
 */
angular.module('PlayerFilter', []).filter('Name', function () {
    return function (string) {
        if (!string)
            return false;
        string = string.trim();

        return (string.length !== 0 && string !== '');
    }
});