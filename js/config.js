(function () {
    'use strict';

    angular.module('staffIntroduction').factory('ConfigService', function ($q) {
        var area = [{
            id: 'sz',
            name: '深圳总部'
        }, {
            id: 'szlg',
            name: '深圳龙岗'
        }, {
            id: 'gz',
            name: '广州'
        }, {
            id: 'dg',
            name: '东莞'
        }];

        return {
            area: area
        };
    });
})();