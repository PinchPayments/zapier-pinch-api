require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - payer_find', () => {
  zapier.tools.env.inject();

  it('should get an array', async () => {
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

    const results = await appTester(
      App.searches['payer_find'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });
});
