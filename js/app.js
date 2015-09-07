/**
 * Created by liyatang on 15/9/6.
 */
(function () {
    'use strict';

    angular.module('staffIntroduction', ['ui.router', 'ngMaterial']).config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'views/home.html'
        }).state('result', {
            url: '/result',
            controller: 'ResultCtrl',
            templateUrl: 'views/result.html'
        });
    });



    angular.module('staffIntroduction').controller('AppCtrl', function($scope){

    });


})();