// 部署网站使用的http服务器，依赖需要单独安装，所需的NODE依赖参考另一个项目：https://github.com/ludejun/node-app-server
const express = require('express');
const compression = require('compression');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const app = express();
const debug = require('debug')('event:server');

const server = http.createServer(app);

const port = '5591';

app.use(compression());
app.set('port', port);

if (process.env.NODE_ENV == 'DEV') {
  app.use(logger('dev'));
}

app.use(express.static(path.join(__dirname, 'release')));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'release/index.html'));
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
