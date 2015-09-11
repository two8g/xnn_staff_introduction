(function () {
    'use strict';

    angular.module('staffIntroduction').factory('DataService', function($q){

        var urlBase = '/api/';
        var niceAjax = function (url, data) {
            var def = $q.defer();
            $.ajax({
                url: urlBase + url,
                type: 'post',
                data: data,
                success: function (re) {
                    if(re !== 0){
                        window.alert(re.msg);
                    }else{
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
            getAll: function () {
                return niceAjax('card/list');
            },
            add: function(card){
                return niceAjax('card/add', card || {});
            },
            set: function (card) {
                return niceAjax('card/set', card);
            }
        };


        return Data;
    });
})();