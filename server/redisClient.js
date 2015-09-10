(function () {
    'use strict';

    var when = require('when');
    var redis = require('redis');

    var config = {
        post: 6379,
        host: '127.0.0.1'
    };

    var redisClient = redis.createClient(config.port, config.host);

    exports.get = function (key) {
        return when.promise(function (resolve, reject) {
            redisClient.get(key, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data ? JSON.parse(data) : null);
                }
            });
        });
    };

    exports.set = function (key, data) {
        if (data === undefined) {
            data = "";
        }
        var s = JSON.stringify(data);
        return when.promise(function (resolve, reject) {
            redisClient.set(key, s, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

})();