(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    var app = express();
    var config = {
        port: 22222
    };

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(express.static(path.join(__dirname, '')));


    app.use('/api', require('./server/router'));


    app.listen(config.port, function() {
        console.log('Express server listening on port ' + config.port);
    });
})();