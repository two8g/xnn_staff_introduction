(function () {
    'use strict';

    var qiniu = require('qiniu');
    var config = require('./config.js');
    var express = require('express');
    var router = express.Router();
    var uptoken;



    router.post('/uptoken', function(req, res) {
        var token = uptoken.token();
        res.header("Cache-Control", "max-age=0, private, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        if (token) {
            res.json({
                code: 0,
                data:{
                    uptoken: token
                }
            });
        }
    });

    qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = config.SECRET_KEY;
    uptoken = new qiniu.rs.PutPolicy(config.Bucket_Name);

    module.exports = router;
})();