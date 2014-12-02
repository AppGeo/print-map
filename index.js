'use strict';

var server = require('./server');
var chalk = require('chalk');
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';

server.listen(port, function () {
  console.log(chalk.green('Listening in %s on localhost:%s'), env, port);
});
