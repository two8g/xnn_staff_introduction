angular.module('ng.maltose.pick').directive('maltoseBuildingPick', function ($maltosePickService) {
    'use strict';

    // 有点复杂，不写注释了

    return {
        restrict: 'A',
        replace: true,
        scope: {
            pickCommunityId: '=',
            ngModel: '=',
            pickChips: '='
        },
        templateUrl: 'views/building.pick.html',
        controller: function ($scope) {
            $scope.pickChips = $scope.pickChips || false;

            // 传引用过去
            $scope.pick = {
                ngModel: $scope.pickChips ? [] : null
            };

            $scope.$watch('pick.ngModel', function(newValue){
                $scope.ngModel = newValue;
            });

            $scope.querySearch = function (searchText) {
                return $maltosePickService.getBuildingByWord({
                    communityId: $scope.pickCommunityId,
                    keyword: searchText
                }).then(function (data) {
                    if ($scope.pickChips) {
                        return _.filter(data, function (value) {
                            return !isExist(value, $scope.pick.ngModel);
                        });
                    }
                    return data;
                });
            };

            function isExist(item, items) {
                var result = false;
                _.each(items, function (value) {
                    if (value.buildingName === item.buildingName) {
                        result = true;
                    }
                });
                return result;
            }
        }
    };
});
