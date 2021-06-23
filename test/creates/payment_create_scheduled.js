require('should');

const zapier = require('zapier-platform-core');
const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - payment_create_scheduled', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    
  let apiMock = nock('https://api.getpinch.com.au');

  afterEach(() => {
      nock.cleanAll();
  });

    const bundle = {
      authData: {
        secret_key: process.env.SECRET_KEY,
        merchant_id: process.env.MERCHANT_ID,
        environment: process.env.ENVIRONMENT
      },

      inputData: {},
    };

    apiMock
      .post('/test/payments')
      .reply(200, App.creates['payment_create_scheduled'].operation.sample);

    const result = await appTester(
      App.creates['payment_create_scheduled'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
