require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - payment_create_scheduled', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        secret_key: process.env.SECRET_KEY,
        merchant_id: process.env.MERCHANT_ID,
        environment: process.env.ENVIRONMENT,
        oauth_consumer_key: process.env.OAUTH_CONSUMER_KEY,
        oauth_consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
        oauth_token: process.env.OAUTH_TOKEN,
        oauth_token_secret: process.env.OAUTH_TOKEN_SECRET,
      },

      inputData: {},
    };

    const result = await appTester(
      App.creates['payment_create_scheduled'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
