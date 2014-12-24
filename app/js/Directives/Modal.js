/**
 * Created by Vadym on 19/12/14.
 */
angular.module('Directives', []).directive('openModal',
    function () {
        return {
            link: function (scope, element, attrs) {
                function openModal() {

                    var $element = angular.element('#myModal');
                    //var ctrl = angular.controller();
                    //ctrl.
                    $element.modal('show');
                }
                element.bind('click', openModal);
            }
        };
    }
);