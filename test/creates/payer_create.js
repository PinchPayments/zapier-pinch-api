require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - payer_create', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        secret_key: process.env.SECRET_KEY,
        merchant_id: process.env.MERCHANT_ID,
        environment: process.env.ENVIRONMENT
      },
    };

    var authResult = await appTester(App.authentication.sessionConfig.perform, bundle);
    bundle.authData.access_token = authResult.access_token;
    const result = await appTester(App.creates['payer_create'].operation.perform, bundle);
    result.should.not.be.an.Array();
  });
});
