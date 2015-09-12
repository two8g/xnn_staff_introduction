/**
 * Created by liyatang on 15/9/6.
 */
(function () {
    'use strict';

    angular.module('staffIntroduction', ['ui.router', 'ngMaterial', 'ng.maltose', 'ng.maltose.grid', 'ng.maltose.uploader']).config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'views/home.html'
        }).state('result', {
            url: '/result/:card_ids',
            controller: 'ResultCtrl',
            templateUrl: 'views/result.html'
        }).state('card', {
            url: '/card/:card_id',
            controller: 'CardCtrl',
            templateUrl: 'views/card.html'
        });
    });



    angular.module('staffIntroduction').controller('AppCtrl', function($scope){

    });


})();