require('should');

const zapier = require('zapier-platform-core');

const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - payer_find', () => {
  zapier.tools.env.inject();

  let apiMock = nock('https://api.getpinch.com.au');

  afterEach(() => {
      nock.cleanAll();
  });


  it('should get an array', async () => {
    const bundle = {
      authData: {
        secret_key: process.env.SECRET_KEY,
        merchant_id: process.env.MERCHANT_ID,
        environment: process.env.ENVIRONMENT
      },

      inputData: {
        payerId: "pyr_XXXXXXXXXXXXXX"},
    };

    
    apiMock
      .get(`/test/payers/${bundle.inputData.payerId}`)
      .reply(200, App.searches['payer_find'].operation.sample);

    const results = await appTester(
      App.searches['payer_find'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });
});
