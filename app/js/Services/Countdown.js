/**
 * Created by Vadym on 27/12/14.
 */

angular.module('counterService', []).factory('CountDown', function () {
    var timer,
        seconds;

    return {
        start: function (_seconds, _interval, callBack) {
            seconds = _seconds;

            timer = setInterval(function () {
                if (seconds == 0)
                    clearInterval(timer);

                if (typeof callBack == 'function')
                    callBack(seconds);
                seconds--;
            }, _interval || 1000);
        },
        stop: function () {
            clearInterval(timer);
        }
    }
});