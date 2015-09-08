myModule.controller('UploaderController', function ($scope, $maltoseUploader, $maltose) {
    'use strict';

    $maltoseUploader.imgUpload($('#uploadFile'), {
        uploadScript: '/admin/address/importAddressInfos',
        onUploadComplete: function (file, data) {
            data = angular.fromJson(data);
            if (data.errorCode === 200) {
                $scope.$apply(function () {
                    $maltose.tips('上传成功');
                });
            } else {
                $scope.$apply(function () {
                    $maltose.tips(data.errorDescription || '未知错误');
                });
            }
        }
    });

}).controller('DialogController', function ($scope, $timeout, $maltose) {

    'use strict';

    $scope.onAlert = function (event) {
        $maltose.alert('asdf', 'asdf', event).then(function () {
            window.console.log('after alert');
        });
    };

    $scope.onConfirm = function (event) {
        $maltose.confirm('a', 'bbbb', event).then(function () {
            window.console.log('after confirm ok');
        }, function () {
            window.console.log('after confirm cancel');
        });
    };

    $scope.onPrompt = function (event) {
        $maltose.prompt('a', 'bbbb', event).then(function (word) {
            window.console.log('after prompt ok' + word);
        }, function () {
            window.console.log('after prompt cancel');
        });
    };

    var num = 1;
    $scope.onToast = function () {
        num++;
        $maltose.tips('1111 ' + num).then(function () {
            window.console.log('after toast');
        });
    };

    $scope.onProgressStart = function () {
        $maltose.progress.start();
    };

    $scope.onProgressDone = function () {
        $maltose.progress.done();
    };
}).controller('ProgressController', function ($scope, $maltose) {
    'use strict';
    $scope.start = function () {
        $maltose.progress.start();
    };

    $scope.done = function () {
        $maltose.progress.done();
    };
});