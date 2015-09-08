angular.module('ng.maltose').directive('maltoseScroll', function ($maltose, $mdMedia) {
    'use strict';
    return {
        restrict: 'A',
        replace: true,
        scope: {},
        templateUrl: 'views/scroll.html',
        controller: function ($scope, $element) {

            var params = $element.attr('maltose-scroll');
            if (params.indexOf('scroll-top') > -1) {
                $scope.top = true;
            }
            if (params.indexOf('scroll-bottom') > -1) {
                $scope.bottom = true;
            }

            $scope.onTop = function () {
                $maltose.scroll.top();
            };

            $scope.onBottom = function () {
                $maltose.scroll.bottom();
            };

            $scope.isShow = $mdMedia('gt-md');
        }
    };
});