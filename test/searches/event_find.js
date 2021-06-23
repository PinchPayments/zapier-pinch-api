require('should');

const zapier = require('zapier-platform-core');
const nock = require('nock');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - event_find', () => {
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
        eventId: "evt_XXXXXXXXXXXXXX"
      },
    };

    apiMock
      .get(`/test/events/${bundle.inputData.eventId}`)
      .reply(200, App.searches['event_find'].operation.sample);

    const results = await appTester(
      App.searches['event_find'].operation.perform,
      bundle
    );

    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });
});
