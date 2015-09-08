angular.module('ng.maltose').factory('$maltoseFocusOn', function ($rootScope, $timeout) {
    'use strict';
    return function (name) {
        return $timeout(function () {
            return $rootScope.$broadcast('maltoseFocusOn', name);
        });
    };
});