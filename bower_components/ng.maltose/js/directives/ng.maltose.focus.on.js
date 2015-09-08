angular.module('ng.maltose').directive('maltoseFocusOn', function () {
    'use strict';
    return function (scope, elem, attr) {
        return scope.$on('maltoseFocusOn', function (e, name) {
            if (name === attr.maltoseFocusOn) {
                return elem[0].focus();
            }
        });
    };
});