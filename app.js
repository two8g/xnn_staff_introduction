(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var app = express();
    var config = {
        port: 22222
    };

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));

    app.use(express.static(path.join(__dirname, '')));


    app.use('/', require('./server/router'));


    app.listen(config.port, function() {
        console.log('Express server listening on port ' + config.port);
    });
})();