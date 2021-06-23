require('should');

const zapier = require('zapier-platform-core');
const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Trigger - new_event', () => {
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
        eventType: 'payment-created'
      },
      meta: {
        page: 0
      }
    };

    apiMock
      .get(`/test/events`)
      .query({ page: 1, eventType: bundle.inputData.eventType })
      .reply(200, {
        "page": 1,
        "pageSize": 50,
        "totalPages": 1,
        "totalItems": 3,
        "data":
          [
            App.triggers['new_event'].operation.sample
          ]
      });

    const results = await appTester(
      App.triggers['new_event'].operation.perform,
      bundle
    );

    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });
});
