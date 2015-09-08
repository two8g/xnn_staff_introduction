angular.module('myApp', ['ng.maltose', 'ng.maltose.grid', 'ng.maltose.uploader', 'ng.maltose.pick']).controller('DemoController', function ($scope, $q) {
    'use strict';

    $scope.province = null;
    $scope.city = null;
    $scope.area = null;

    $scope.citys = [];

    $scope.community = null;
    $scope.communitys = [];

    $scope.building = null;
    $scope.buildings = [];

    $scope.apartment = null;
    $scope.apartments = [];

});