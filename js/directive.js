(function(){
    'use strict';

    var module  = angular.module('staffIntroduction');

    module.directive('cardDirective', function(){
        return {
            restrict: 'AE',
            replace: true,
            scope: {
               ngModel: '='
            },
            templateUrl: 'views/directive/card.html',
            controller: function ($scope) {

            }
        };
    });

    module.directive('signDirective', function(){
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: '='
            },
            templateUrl: 'views/directive/sign.html',
            controller: function ($scope) {

            }
        };
    });

})();