require('should');

const zapier = require('zapier-platform-core');

const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - payment_links_by_payer_find', () => {
  zapier.tools.env.inject();

  let apiMock = nock('https://api.getpinch.com.au');

  afterEach(() => {
      nock.cleanAll();
  });


  it('should get an array of payment links for a payer', async () => {
      const bundle = {
        authData: {
          secret_key: process.env.SECRET_KEY,
          merchant_id: process.env.MERCHANT_ID,
          environment: process.env.ENVIRONMENT
        },

        inputData: {
          payerId: "pyr_XXXXXXXXXXXXXX",
          page: 1,
          pageSize: 50
        },
      };

      const sampleData = {
        data: [App.searches['payment_links_by_payer_find'].operation.sample]
      };
    
      apiMock
        .get(`/test/payment-links/payer/${bundle.inputData.payerId}`)
        .query({ page: 1, pageSize: 50 })
        .reply(200, sampleData);

      const results = await appTester(
        App.searches['payment_links_by_payer_find'].operation.perform,
        bundle
      );
      results.should.be.an.Array();
      results.length.should.be.aboveOrEqual(1);
      results[0].should.have.property('id');
    });
  });
