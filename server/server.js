const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const NodeHttp = require('inblox-node-http');
const path = require('path');
const ejs = require('ejs');
const favicon = require('serve-favicon');

const routes = require('./routes');

const { PORT } = require('./config');

const server = express();

/**
 * Start the app by listening <port>
 * */
const app = server.listen(PORT);

/**
 * List of all middlewares used in project cors, compression, helmet
 * */
try {
  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  server.enable('trust proxy');
  server.use(NodeHttp());

  server.use(
    cors({
      exposedHeaders: ['token'],
    })
  );
  server.use(compression());
  server.use(helmet());
  server.use(
    express.urlencoded({
      extended: true,
    })
  );
  server.use(express.json());
  server.use(express.static(path.join(__dirname, 'dist')));
  server.use(express.static(path.join(__dirname, 'vendor')));
  server.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));

  server.set('view engine', 'ejs');
  server.engine('.html', ejs.renderFile);
  server.set('views', path.join(__dirname, 'views'));
  server.use('/', routes);
} catch (e) {
  app.close();
}

module.exports = server;
