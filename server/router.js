(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var when = require('when');
    var redisClient = require('./redisClient');
    var _ = require('underscore');

    //function processRes(res){
    //
    //}

    //var CardsData = [{
    //    id: 1441583926153,
    //    face: 'images/2.jpg',
    //    name: '李雅堂',
    //    department: '技术部',
    //    entryTime: new Date(),
    //    introduction: '大家好，我叫李雅堂，可以叫我麦芽糖。家乡广东茂名，兴趣玩游戏和下厨。很高兴加入小农女和大家一起工作，多多指教。'
    //}, {
    //    id: 1441583926154,
    //    face: 'images/1.jpg',
    //    name: '李吉荣',
    //    department: '行政部',
    //    entryTime: new Date(),
    //    introduction: '大家好，很高兴和大家一起共事。多多指教。'
    //}];

    var date = +new Date();
    var flag = 0;

    function getUniqueId() {
        return date + flag++;
    }

    function getCardKey(id) {
        return 'si_card_' + id;
    }

    function getCardsKey() {
        return 'si_cards';
    }

    function preRes(promise, res) {
        promise.then(function (data) {
            res.json({
                code: 0,
                data: data
            });
        }, function (reason) {
            res.json({
                code: -1,
                msg: reason || '未知错误'
            });
        });
    }

    router.post('/card/get', function (req, res) {
        var id = Number(req.body.id);
        preRes(redisClient.get(getCardKey(id)), res);
    });

    router.post('/card/list', function (req, res) {
        preRes(redisClient.get(getCardsKey()).then(function (data) {
            var arr = [];
            _.each(data, function (id) {
                arr.push(redisClient.get(getCardKey(id)));
            });

            return when.all(arr).then(function (darr) {
                return darr;
            });
        }), res);
    });

    router.post('/card/set', function (req, res) {
        var card = JSON.parse(req.body.card || {});
        if (!card.id) {
            card.id = getUniqueId();
            var setCardList = redisClient.get(getCardsKey()).then(function (data) {
                data = data || [];
                data.push(card.id);
                return redisClient.set(getCardsKey(), data);
            });
            var setCard = redisClient.set(getCardKey(card.id), card);

            preRes(when.all([
                setCardList,
                setCard
            ]).then(function (re) {
                return re[1];
            }), res);
        } else {
            preRes(redisClient.set(getCardKey(card.id), card), res);
        }
    });

    router.post('/card/del', function (req, res) {
        var id = Number(req.body.id);
        preRes(redisClient.get(getCardsKey()).then(function (data) {
            data = data || [];
            data = _.reject(data, function (value) {
                return value === id;
            });
            return redisClient.set(getCardsKey(), data);
        }), res);
    });

    module.exports = router;
})();