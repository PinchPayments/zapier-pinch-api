require('should');
const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../../index');

const appTester = zapier.createAppTester(App);

describe('Create - payment_link_delete', () => {
  zapier.tools.env.inject();    
  let apiMock = nock('https://api.getpinch.com.au');

  afterEach(() => {
      nock.cleanAll();
  });

  it('should delete a payment link', async () => {
    const bundle = {
      authData: {
        secret_key: process.env.SECRET_KEY,
        merchant_id: process.env.MERCHANT_ID,
        environment: process.env.ENVIRONMENT
      },
      inputData: {
          id: 'plk_XXXXXXXXXXXXXX',
        },
      };

      apiMock
        .delete(`/test/payment-links/${bundle.inputData.id}`)
      .reply(200, {});

    const result = await appTester(
      App.creates['payment_link_delete'].operation.perform,
      bundle
    );

    result.should.not.be.an.Array();
    result.should.have.property('id');
    result.should.have.property('deleted');
    result.deleted.should.be.true();
    apiMock.isDone().should.be.true;
  });
});

