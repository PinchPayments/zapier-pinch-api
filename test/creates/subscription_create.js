require('should');

const zapier = require('zapier-platform-core');
const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - subscription_create', () => {
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

      inputData: {
        planId: "pln_XXXXXXXXXXXXXX",
        payerId: "pyr_XXXXXXXXXXXXXX"
      },
    };

    apiMock
      .post(`/test/subscriptions`)
      .reply(200, App.creates['source_create'].operation.sample);

    const result = await appTester(
      App.creates['subscription_create'].operation.perform,
      bundle
    );

    result.should.not.be.an.Array();
  });
});
