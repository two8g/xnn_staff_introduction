(function () {
    'use strict';

    var module = angular.module('staffIntroduction');

    module.controller('HomeCtrl', function ($scope, DataService, $state) {


        $scope.addCard = function () {
            DataService.Card.set({}).then(function () {
                getCards();
            });
        };


        $scope.gridData = {
            enableSelect: true,
            columns: [
                {field: 'id', name: 'id'},
                {field: 'name', name: '名字'},
                {field: 'department', name: '所在部门'},
                {field: 'entryTime', name: '入职时间', render: renderTime},
                {field: 'introduction', name: '自我介绍', style:'width: 200px;'},
                {field: 'face', name: '图片', render: renderFace}
            ],
            actions: [{
                type: 'btn',
                html: '编辑',
                action: onEdit
            }],
            getData: function () {
                return getCards().then(function (data) {
                    return _.sortBy(data, function (value) {
                        return -value.id;
                    });
                });
            }
        };

        function getCards(){
            return DataService.Card.getAll();
        }

        function renderTime(){
            return '<span ng-bind="data[col.field] | date:\'yyyy-MM-dd\'"></span>';
        }

        function renderFace(){
            return '<div class="ui-card-img-container"><img ng-src="{{data[col.field]}}" /></div>';
        }

        function onEdit(card){
            $state.go('card', {
                card_id: card.id
            });
        }
    });

    module.controller('CardCtrl', function ($scope, DataService, $state, $maltoseUploader, $q) {
        var cardId = Number($state.params.card_id);

        $scope.card = {};

        $scope.onSubmit = function () {
            DataService.Card.set($scope.card).then(function (data) {
                console.log(data);
            });
        };

        DataService.Card.get(cardId).then(function (data) {
            debugger;
            $scope.card = data;
        });

        $maltoseUploader.imgUpload($('#uploadFile')[0], {
            onAddQueueItem: function (file) {
                readFile(file).then(function (data) {
                    $scope.card.face = data;
                });
            }
        });

        function readFile(file){
            var def = $q.defer();
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                def.resolve(this.result);
            };
            return def.promise;
        }

    });

    module.controller('ResultCtrl', function($scope, DataService){

        DataService.Card.getAll().then(function (data) {
            $scope.cards = data;
        });
    });

})();