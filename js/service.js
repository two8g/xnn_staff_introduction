(function () {
    'use strict';

    angular.module('staffIntroduction').factory('DataService', function ($q) {

        var urlBase = '/api/';
        var niceAjax = function (url, data) {
            var def = $q.defer();

            $.ajax({
                url: urlBase + url,
                type: 'post',
                data: data,
                success: function (re) {
                    if (re.code !== 0) {
                        window.alert(re.msg);
                    } else {
                        def.resolve(re.data);
                    }
                }
            });
            return def.promise;
        };

        var Data = {};


        Data.Card = {
            get: function (id) {
                return niceAjax('card/get', {id: id});
            },
            gets: function (ids) {
                return niceAjax('card/gets', {
                    ids: JSON.stringify(ids || [])
                });
            },
            getList: function (area) {
                return niceAjax('card/list', {
                    area: area
                });
            },
            set: function (card) {
                return niceAjax('card/set', {
                    card: JSON.stringify(card || {})
                });
            },
            del: function (id) {
                return niceAjax('card/del', {
                    id: id
                });
            }
        };


        return Data;
    });
})();