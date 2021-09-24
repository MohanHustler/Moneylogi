const { HealthCheck } = require('../services');
const { VERSION, IDENTITY_SERVICE_URL } = require('../config');

const status = async (req, res) => {
  const response = [];

  const checkDbConnection = await HealthCheck.status([ IDENTITY_SERVICE_URL ]);

  response.push(checkDbConnection);

  return res.getRequest({
    dependsOn: response,
    version: `${VERSION}`,
  });
};

module.exports = { status };
