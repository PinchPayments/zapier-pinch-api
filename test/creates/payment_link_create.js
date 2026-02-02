require('should');
const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../../index');

const appTester = zapier.createAppTester(App);

describe('Create - payment_link_create', () => {
  zapier.tools.env.inject();    
  let apiMock = nock('https://api.getpinch.com.au');

  afterEach(() => {
      nock.cleanAll();
  });

  it('should create a payment link', async () => {
    const bundle = {
      authData: {
        secret_key: process.env.SECRET_KEY,
        merchant_id: process.env.MERCHANT_ID,
        environment: process.env.ENVIRONMENT
      },
      inputData: {
        payerId: 'pyr_XXXXXXXXXXXXXX',
        amount: 1000,
        description: 'Test payment link',
        allowedPaymentMethods: ['credit-card'],
        returnUrl: 'https://example.com/return',
      },
    };

    apiMock
      .post('/test/payment-links')
      .reply(200, App.creates['payment_link_create'].operation.sample);

    const result = await appTester(
      App.creates['payment_link_create'].operation.perform,
      bundle
    );

    result.should.not.be.an.Array();
    result.should.have.property('id');
    result.should.have.property('url');
    apiMock.isDone().should.be.true;
  });
});

