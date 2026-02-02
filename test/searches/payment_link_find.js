require('should');

const zapier = require('zapier-platform-core');

const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - payment_link_find', () => {
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
          id: "plk_XXXXXXXXXXXXXX"},
      };

    
      apiMock
        .get(`/test/payment-links/${bundle.inputData.id}`)
      .reply(200, App.searches['payment_link_find'].operation.sample);

    const results = await appTester(
          App.searches['payment_link_find'].operation.perform,
          bundle
        );
        results.should.be.an.Array();
        results.length.should.be.aboveOrEqual(1);
        results[0].should.have.property('id');
        results[0].should.have.property('url');
        results[0].should.have.property('amountInCents');
      });
    });
