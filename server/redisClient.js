(function () {
    'use strict';

    var when = require('when');
    var redis = require('redis');

    var config = {
        post: 6379,
        host: '127.0.0.1',
        password: 'xnnredis@2015'
    };

    var redisClient = redis.createClient(config.port, config.host, {
        'auth_pass': config.password
    });

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

    exports.del = function (key) {
        return when.promise(function (resolve, reject) {
            redisClient.del(key, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(key);
                }
            });
        });
    };

})();