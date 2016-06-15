(function () {
    'use strict';

    var module = angular.module('staffIntroduction');

    module.controller('HomeCtrl', function ($scope, DataService, $state, ConfigService) {

        $scope.areas = ConfigService.area;

        function reloadGrid() {
            $scope.gridData.watchReload = true;
        }

        $scope.gridData = {
            enableSelect: true,
            columns: [
                {field: 'id', name: 'id + 地区 + 添加时间', render: renderInfo},
                {field: 'name', name: '名字'},
                {field: 'department', name: '所在部门'},
                {field: 'entryTime', name: '入职时间', render: renderTime},
                {field: 'introduction', name: '自我介绍', style: 'width: 200px;'},
                {field: 'face', name: '图片', render: renderFace, style: 'width: 100px;'}
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
            return DataService.Card.getList();
        }

        function renderInfo() {
            return '<span>' +
                '<span ng-bind="data[\'id\']"></span><br/>' +
                '<span ng-bind="data[\'area\']"></span><br/>' +
                '<span ng-bind="data[col.field] | toDate | date:\'yyyy-MM-dd HH:mm\'"></span><br/>' +
                '</span>';
        }

        function renderTime() {
            return '<span ng-bind="data[col.field]"></span>';
        }

        function renderFace() {
            return '<div class="ui-card-img-container"><img ng-src="{{data[col.field] | imageView}}" /></div>';
        }

        function onResult(cards) {
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

    module.controller('AreaCtrl', function ($scope, DataService, $state) {
        var area = $state.params.area;

        $scope.addCard = function () {
            DataService.Card.set({area: area}).then(function () {
                reloadGrid();
            });
        };

        function reloadGrid() {
            $scope.gridData.watchReload = true;
        }

        $scope.gridData = {
            enableSelect: true,
            columns: [
                {field: 'addTime', name: '添加时间', render: renderAddTime},
                {field: 'name', name: '名字'},
                {field: 'department', name: '所在部门'},
                {field: 'entryTime', name: '入职时间', render: renderTime},
                {field: 'introduction', name: '自我介绍', style: 'width: 200px;'},
                {field: 'face', name: '图片', render: renderFace, style: 'width: 200px;'}
            ],
            actions: [{
                type: 'btn',
                html: '编辑',
                action: onEdit
            }, {
                type: 'btn',
                html: '删除',
                action: onDel
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
            return DataService.Card.getList(area);
        }

        function renderAddTime() {
            return '<span ng-bind="data[col.field] | toDate | date:\'yyyy-MM-dd HH:mm\'"></span>';
        }

        function renderTime() {
            return '<span ng-bind="data[col.field]"></span>';
        }

        function renderFace() {
            return '<div class="ui-card-img-container"><img ng-src="{{data[col.field]}}" /></div>';
        }

        function onResult(cards) {
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

    module.controller('CardCtrl', function ($scope, DataService, $state, $maltoseUploader, $q, $maltose, $timeout) {
        var cardId = Number($state.params.card_id);

        $scope.card = {};

        $scope.onSubmit = function () {
            DataService.Card.set($scope.card).then(function (data) {
                $maltose.tips('保存成功');
            });
        };

        //$('#imgUpload').on('change', function (e) {
        //    readFile(e.target.files[0]).then(function (data) {
        //        $scope.card.face = data;
        //    });
        //});


        DataService.Card.get(cardId).then(function (data) {
            $scope.card = data;
        });

        //function readFile(file) {
        //    var def = $q.defer();
        //    var reader = new FileReader();
        //    reader.readAsDataURL(file);
        //    reader.onload = function (e) {
        //        def.resolve(this.result);
        //    };
        //    return def.promise;
        //}


        DataService.storage.getToken().then(function (data) {
            $scope.uptoken = data.uptoken;

            var Qiniu = window.Qiniu;

            var uploader = Qiniu.uploader({
                runtimes: 'html5',
                browse_button: 'imgUpload',
                container: 'imgUploadContainer',
                drop_element: 'imgUploadContainer',
                max_file_size: '10mb',
                chunk_size: '4mb',
                //uptoken_url: $scope.uptoken,
                uptoken: data.uptoken,
                domain: 'http://7xlnio.com1.z0.glb.clouddn.com',
                get_new_uptoken: false,
                auto_start: true,
                init: {
                    FileUploaded: function (up, file, info) {
                        $maltose.tips('上传成功');
                        var json = JSON.parse(info);
                        $timeout(function () {
                            $scope.card.face = up.getOption('domain') + '/' + json.key;
                        }, 1);
                    },
                    Error: function (up, err, errTip) {
                        $maltose.tips(errTip);
                    },
                    BeforeUpload: function (up, file) {
                        $maltose.tips('上传中');
                    }
                }
            });
        });

    });

    module.controller('ResultCtrl', function ($scope, DataService, $state) {

        var cardIds = $state.params.card_ids.split(',');
        DataService.Card.gets(cardIds).then(function (data) {
            if (data.length % 3 === 1) {
                data.push({});
                data.push({});
            } else if (data.length % 3 === 2) {
                data.push({});
            }

            $scope.cards = data;
        });
    });

    module.controller('QiniuCtrl', function ($scope, DataService) {
        DataService.storage.getToken().then(function (data) {
            $scope.uptoken = data.uptoken;

            var Qiniu = window.Qiniu;

            var uploader = Qiniu.uploader({
                runtimes: 'html5',
                browse_button: 'pickfiles',
                container: 'container',
                drop_element: 'container',
                max_file_size: '10mb',
                chunk_size: '4mb',
                //uptoken_url: $scope.uptoken,
                uptoken: data.uptoken,
                domain: 'http://7xlnio.com1.z0.glb.clouddn.com',
                get_new_uptoken: false,
                auto_start: true,
                init: {
                    FileUploaded: function (up, file, info) {
                        console.log(info);
                    }
                }
            });
        });
    });

    module.controller('SignCtrl', function ($scope, $state) {
        // $scope.sign = {
        //    img: '../images/sign.png',
        //    name: '李吉荣',
        //    department: '人力行政中心',
        //    mobile: '13691928980',
        //    email: 'lijirong@xiaonongnv.com'
        // };
        $scope.sign = {
            img: '../images/sign.png'
        };

        $scope.companyMap = {
            'zb': {
                name: '深圳市小农女供应链有限公司',
                address: '深圳市南山区高新南一路赋安科技大厦B座708',
                phone: '0755-86569156'
            },
            'lg': {
                name: '深圳市小农女供应链有限公司龙岗分公司',
                address: '深圳市龙岗区平湖街道白泥坑社区东泰路3号K3栋',
                phone: '0755-86569156'
            },
            'gm': {
                name: '深圳市观麦网络科技有限公司',
                address: '深圳市南山区高新南一路赋安科技大厦B座708',
                phone: '0755-86569156'
            },
            'gz': {
                name: '深圳市小农女供应链有限公司广州分公司',
                address: '广州市天河区元岗北街145号谷裕市场六号棚',
                phone: '020-32967380'
            },
            'dg': {
                name: '深圳市小农女供应链有限公司东莞分公司',
                address: '东莞市南城区胜和体育路南侧盈峰商务中心东区505',
                phone: '0755-86569156'
            }
        };

        $scope.sign.companyInfo = $scope.companyMap[$state.params.area];

        $scope.toImg = function () {
            var $sign = $('#sign');

            // var w = $sign.width();
            // var h = $sign.height();
            //
            // //要将 canvas 的宽高设置成容器宽高的 2 倍
            // var canvas = document.createElement("canvas");
            // canvas.id = 'screenshotCanvas';
            // canvas.width = w * 2;
            // canvas.height = h * 2;
            // canvas.style.width = w + "px";
            // canvas.style.height = h + "px";
            // var context = canvas.getContext("2d");
            // // //然后将画布缩放，将图像放大两倍画到画布上
            // // context.scale(2, 2);
            // context.scale(2, 2);

            window.html2canvas($sign[0], {
                // canvas: canvas,
                onrendered: function (canvas) {
                    canvas.id = 'screenshotCanvas';
                    document.getElementById('imgContainer').appendChild(canvas);
                }
            });

            $scope.isToImg = true;
        };

        $scope.downloadImg = function () {
            var can = document.getElementById("screenshotCanvas");
            var imgDataURI = can.toDataURL('image/png');
            window.open(imgDataURI);
        };
    });

})();