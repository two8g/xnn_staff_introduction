(function () {
    'use strict';
    var module = angular.module('staffIntroduction');
    module.filter('toDate', function () {
        return function (input) {
            return new Date(input);
        };
    });

    module.filter('imageView', function () {
        return function (input) {
            return input ? input + '?imageView2/0/w/400/h/400' : 'images/xnv.png';
        };
    });
})();