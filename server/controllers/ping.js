const { VERSION } = require('../config');

/**
 * Check whether microservice is working
 * @return {object} status - returns ok that specifies that microservice is working.
 * */
const status = (req, res) => {
  res.status(200).json({ status: 'ok', version: VERSION });
};

module.exports = { status };
