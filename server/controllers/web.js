const { VERSION, IDENTITY_SERVICE_URL, FILE_SERVICE_URL, LOAN_SERVICE_URL, BANKING_SERVICE_URL, REPORTING_SERVICE_URL } = require('../config');

const clientPortal = async (req, res) => {
  res.render('index', { BANKING_SERVICE_URL, FILE_SERVICE_URL, IDENTITY_SERVICE_URL, LOAN_SERVICE_URL, REPORTING_SERVICE_URL, VERSION });
};

module.exports = { clientPortal };
