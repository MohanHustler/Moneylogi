/* eslint-disable filenames/match-exported */
const express = require('express');

const router = express.Router();

const pingRoutes = require('./ping.js');
const healthCheckRoutes = require('./health-check.js');
const webRoutes = require('./web');
const apiSpecRoutes = require('./api-spec');

pingRoutes(router);
healthCheckRoutes(router);
webRoutes(router);
apiSpecRoutes(router);

module.exports = router;
