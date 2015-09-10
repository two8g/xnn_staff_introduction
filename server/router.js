(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var redisClient = require('./redisClient');

    //function processRes(res){
    //
    //}

    router.get('/card', function (req, res) {
        redisClient.get('card').then(function (data) {
            res.json({
                code: 0,
                data: data
            });
        });
    });

    module.exports = router;
})();