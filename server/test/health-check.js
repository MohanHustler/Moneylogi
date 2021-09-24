const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../server');
const { IDENTITY_SERVICE_URL } = require('../config');

const { expect } = chai;

chai.use(chaiHttp);

const healthCheckResponse = [ {
  name: `${IDENTITY_SERVICE_URL}/ping`,
  status: 'Success',
  type: 'API',
} ];

/**
 * Test the /GET route for health api
 * */
describe('HealthCheck /GET', () => {
  const request = chai.request(server);
  const httpGet = sinon.stub(request, 'get');

  httpGet.yields(null, {
    body: healthCheckResponse,
    status: 200,
  }, null);

  it('should return response status equals to 200', async () => {
    await request.get('/healthcheck', (err, { status }) => {
      expect(status).to.equal(200);
    });
  });

  it('should return response body equals to healthCheckResponse', async () => {
    await request.get('/healthcheck', (err, { body }) => {
      expect(body).to.equal(healthCheckResponse);
    });
  });
});
