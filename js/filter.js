(function () {
    'use strict';
    var module = angular.module('staffIntroduction');
    module.filter('toDate', function () {
        return function (input) {
            return new Date(input);
        };
    });
})();