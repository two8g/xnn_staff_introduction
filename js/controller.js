(function () {
    'use strict';

    var module = angular.module('staffIntroduction');

    module.controller('HomeCtrl', function ($scope, DataService) {


        DataService.addCard = function () {
            DataService.Card.add({}).then(function () {
                getCards();
            });
        };


        getCards();

        function getCards(){
            DataService.Card.getAll().then(function (data) {
                $scope.cards = data;
            });
        }
    });



    module.controller('ResultCtrl', function($scope, DataService){

        DataService.Card.getAll().then(function (data) {
            $scope.cards = data;
        });
    });


})();