/* eslint-disable sort-keys */
module.exports = {
  PORT: process.env.PORT || 3000,
  IDENTITY_SERVICE_URL:
    process.env.IDENTITY_SERVICE_URL ||
    'http://identity-service-test.moneyloji.in',
  FILE_SERVICE_URL:
    process.env.FILE_SERVICE_URL || 'http://file-service-test.moneyloji.in',
  LOAN_SERVICE_URL:
    process.env.LOAN_SERVICE_URL || 'http://loan-service-test.moneyloji.in',
  BANKING_SERVICE_URL:
    process.env.BANKING_SERVICE_URL ||
    'http://banking-service-test.moneyloji.in',
  REPORTING_SERVICE_URL:
    process.env.REPORTING_SERVICE_URL ||
    'http://reporting-service-test.moneyloji.in',
};
