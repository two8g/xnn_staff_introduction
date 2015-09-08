(function () {
    'use strict';

    angular.module('staffIntroduction').factory('DataService', function($q){

        var Data = {};

        var CardsData = [{
            id: 1441583926153,
            face: 'images/2.jpg',
            name: '李雅堂',
            department: '技术部',
            entryTime: new Date(),
            introduction: '大家好，我叫李雅堂，可以叫我麦芽糖。家乡广东茂名，兴趣玩游戏和下厨。很高兴加入小农女和大家一起工作，多多指教。'
        }, {
            id: 1441583926154,
            face: 'images/1.jpg',
            name: '李吉荣',
            department: '行政部',
            entryTime: new Date(),
            introduction: '大家好，很高兴和大家一起共事。多多指教。'
        }];

        var date = +new Date();
        var flag = 0;
        function getUniqueId(){
            return date + flag++;
        }


        Data.Card = {
            get: function (id) {
                var card = _.find(CardsData, function (value) {
                    return value.id === id;
                });
                return card ? $q.resolve(card) : $q.reject('找不到');
            },
            getAll: function () {
                return $q.when(CardsData);
            },
            add: function(card){
                card.id = getUniqueId();
                CardsData.push(card);
                return $q.when(card);
            },
            set: function (card) {
                return $q.when(card);
            }
        };


        return Data;
    });
})();