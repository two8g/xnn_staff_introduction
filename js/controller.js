(function () {
    'use strict';

    var module = angular.module('staffIntroduction');

    module.controller('HomeCtrl', function ($scope, DataService, $state) {


        $scope.addCard = function () {
            DataService.Card.set({}).then(function () {
                reloadGrid();
            });
        };

        function reloadGrid() {
            $scope.gridData.watchReload = true;
        }

        $scope.gridData = {
            enableSelect: true,
            columns: [
                {field: 'id', name: 'id'},
                {field: 'name', name: '名字'},
                {field: 'department', name: '所在部门'},
                {field: 'entryTime', name: '入职时间', render: renderTime},
                {field: 'introduction', name: '自我介绍', style: 'width: 200px;'},
                {field: 'face', name: '图片', render: renderFace}
            ],
            actions: [{
                type: 'btn',
                html: '编辑',
                action: onEdit
            }, {
                type: 'btn',
                html: '删除',
                action: onDel
            }, {
                type: 'btn',
                html: '生成',
                batch: onResult
            }],
            getData: function () {
                return getCards().then(function (data) {
                    return _.sortBy(data, function (value) {
                        return -value.id;
                    });
                });
            }
        };

        function getCards() {
            return DataService.Card.getAll();
        }

        function renderTime() {
            return '<span ng-bind="data[col.field] | date:\'yyyy-MM-dd\'"></span>';
        }

        function renderFace() {
            return '<div class="ui-card-img-container"><img ng-src="{{data[col.field]}}" /></div>';
        }

        function onResult(cards){
            window.open($state.href('result', {
                card_ids: _.map(cards, function (value) {
                    return value.id;
                }).join(',')
            }, {
                absolute: true
            }));
        }

        function onEdit(card) {
            window.open($state.href('card', {
                card_id: card.id
            }, {
                absolute: true
            }));
        }

        function onDel(card) {
            if (window.confirm('确定删除？')) {
                DataService.Card.del(card.id).then(function () {
                    reloadGrid();
                });
            }
        }
    });

    module.controller('CardCtrl', function ($scope, DataService, $state, $maltoseUploader, $q) {
        var cardId = Number($state.params.card_id);

        $scope.card = {};

        $scope.onSubmit = function () {
            DataService.Card.set($scope.card).then(function (data) {
                window.alert('保存成功');
            });
        };

        $('#imgUpload').on('change', function (e) {
            readFile(e.target.files[0]).then(function (data) {
                $scope.card.face = data;
            });
        });


        DataService.Card.get(cardId).then(function (data) {
            $scope.card = data;
        });

        function readFile(file) {
            var def = $q.defer();
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                def.resolve(this.result);
            };
            return def.promise;
        }

    });

    module.controller('ResultCtrl', function ($scope, DataService, $state) {

        var cardIds = $state.params.card_ids.split(',');
        DataService.Card.gets(cardIds).then(function (data) {
            $scope.cards = data;
        });
    });

})();