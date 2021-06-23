require('should');

const zapier = require('zapier-platform-core');
const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - payment_create_realtime', () => {
  zapier.tools.env.inject();

  let apiMock = nock('https://api.getpinch.com.au');

  afterEach(() => {
      nock.cleanAll();
  });

  it('should create an object', async () => {
    const bundle = {
      authData: {
        secret_key: process.env.SECRET_KEY,
        merchant_id: process.env.MERCHANT_ID,
        environment: process.env.ENVIRONMENT
      },

      inputData: {},
    };
      
    apiMock
      .post('/test/payments/realtime')
      .reply(200, App.creates['payment_create_realtime'].operation.sample);

    const result = await appTester(
      App.creates['payment_create_realtime'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
