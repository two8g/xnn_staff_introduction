angular.module('ng.maltose').factory('$maltose', function ($modal, $compile, $rootScope, $templateRequest, $timeout, $maltoseSha256, $q) {
    'use strict';

    var alert = function (opts) {
        //opts = {content, title, event}
        return $modal.open({
            templateUrl: 'views/alert.html',
            scope: $.extend($rootScope.$new(), opts),
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close('ok');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.close = function () {
                    $modalInstance.dismiss('close');
                };
            },
            size: 'sm'
        }).result;
    };

    var confirm = function (opts) {
        //opts = {content, title, ev}
        return $modal.open({
            templateUrl: 'views/confirm.html',
            scope: $.extend($rootScope.$new(), opts),
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close('ok');
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.close = function () {
                    $modalInstance.dismiss('close');
                };
            },
            size: 'sm'
        }).result;
    };

    var prompt = function (opts) {
        //opts = {content, title, word, ev}
        return $modal.open({
            templateUrl: 'views/prompt.html',
            scope: $.extend($rootScope.$new(), opts),
            controller: function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close($scope.word);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.close = function () {
                    $modalInstance.dismiss('close');
                };
            },
            size: 'sm'
        }).result;
    };

    var _$toast = null;
    var _toastScope = $rootScope.$new();
    _toastScope.list = [];
    var toast = function (word, type, time) {
        var def = $q.defer();

        if (!_$toast) {
            _$toast = true;
            $templateRequest('views/toast.html').then(function (data) {
                _$toast = $(data);
                $(document.body).append(_$toast);
                $compile(_$toast)(_toastScope);
            });
        }
        var key = +new Date();
        _toastScope.list.unshift({word: word, _key_: key});
        $timeout(function () {
            _toastScope.list.splice(_toastScope.list.indexOf(_.find(_toastScope.list, function (value) {
                return value._key_ === key;
            })), 1);
            def.resolve({});
        }, time || 3000);

        return def.promise;
    };

    var _$progress = null;
    var _progressScope = $rootScope.$new();
    _progressScope.show = false;
    var progress = {
        start: function () {
            if (!_$progress) {
                _$progress = true;
                $templateRequest('views/progress.html').then(function (data) {
                    _$progress = $(data);
                    $(document.body).append(_$progress);
                    $compile(_$progress)(_progressScope);
                });
            }
            _progressScope.show = true;
        },
        done: function () {
            _progressScope.show = false;
        }
    };


    var scroll = {
        set: function (value) {
            var _content = $('#_siteContent')[0];
            _content.scrollTop = value;
        },
        top: function () {
            scroll.set(0);
        },
        bottom: function () {
            scroll.set($('#_siteContent>div:first').height());
        },
        page: function () {
            scroll.set(document.body.scrollTop + document.documentElement.clientHeight);
        }
    };

    var format = function (str, data) {
        var result = str;
        if (arguments.length < 2) {
            return result;
        }

        result = result.replace(/\{([\d\w\.]+)\}/g, function (key) {
            var keys = arguments[1].split('.');
            var r = null;
            _.each(keys, function (value, index) {
                if (index) {
                    r = r[value];
                } else {
                    r = data[value];
                }
            });
            return r;
        });
        return result;
    };

    var time = {
        str2date: function (dateStr) {
            var d = dateStr.replace(/[-/:]/g, ' ').split(' ');
            //具体到s
            return new Date(d[0], (d[1] - 1), d[2], (d[3] || 0), (d[4] || 0), (d[5] || 0), (d[6] || 0));
        }
    };

    var _userInfo = null;
    var userInfo = {
        set: function (info) {
            _userInfo = info;
        },
        get: function () {
            return _userInfo;
        }
    };


    var ZL = {
        alert: alert,
        confirm: confirm,
        prompt: prompt,
        tips: toast,
        progress: progress,
        scroll: scroll,
        format: format,
        sha256: $maltoseSha256,
        userInfo: userInfo,
        time: time
    };

    // 虽然暴漏给外面。 但是涉及到ng的生命周期的都不能载控制台来调用。
    window.ZL = ZL;

    return ZL;
});