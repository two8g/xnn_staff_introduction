/**
 * Created by liyatang on 15/9/6.
 */
(function () {
    'use strict';

    angular.module('staffIntroduction', ['ui.router', 'ng.maltose', 'ng.maltose.grid', 'ng.maltose.uploader']).config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('index', {
            url: '/',
            controller: function () {

            },
            template: '<div>请联系管理员</div>'
        }).state('home', {
            url: '/huangxiaofang',
            controller: 'HomeCtrl',
            templateUrl: 'views/home.html'
        }).state('/area', {
            url: '/area/:area',
            controller: 'AreaCtrl',
            templateUrl: 'views/area.html'
        }).state('result', {
            url: '/result/:card_ids',
            controller: 'ResultCtrl',
            templateUrl: 'views/result.html'
        }).state('card', {
            url: '/card/:card_id',
            controller: 'CardCtrl',
            templateUrl: 'views/card.html'
        }).state('qiniu', {
            url: '/qiniu',
            controller: 'QiniuCtrl',
            templateUrl: 'views/qiniu.html'
        }).state('sign', {
            url: '/sign/:area',
            controller: 'SignCtrl',
            templateUrl: 'views/sign.html'
        });
    });



    angular.module('staffIntroduction').controller('AppCtrl', function($scope){

    });


})();