require('should');
const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../../index');

const appTester = zapier.createAppTester(App);

describe('Create - payer_create', () => {
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
    };

    apiMock
      .post('/test/payers')
      .reply(200, App.creates['payer_create'].operation.sample);

    var authResult = await appTester(App.authentication.sessionConfig.perform, bundle);
    bundle.authData.access_token = authResult.access_token;
    const result = await appTester(App.creates['payer_create'].operation.perform, bundle);
    result.should.not.be.an.Array();
    apiMock.isDone().should.be.true;
  });
});
