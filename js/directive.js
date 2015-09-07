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
            templateUrl: 'views/card.html',
            controller: function ($scope) {
                $scope.card = $scope.ngModel;
            }
        };
    });

})();