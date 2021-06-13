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
        environment: process.env.ENVIRONMENT
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
