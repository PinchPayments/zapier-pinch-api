'use strict';
const should = require('should');
const jwt_decode = require('jwt-decode');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Session Auth Tests', () => {
  zapier.tools.env.inject();

  it('Has an exchange for merchant/secret', async () => {
    const bundle = {
      authData: {
        merchant_id: process.env.MERCHANT_ID,
        secret_key: process.env.SECRET_KEY,
        environment: process.env.ENVIRONMENT
      }
    };

    const newAuthData = await appTester(App.authentication.sessionConfig.perform, bundle);
    const decodedToken = jwt_decode(newAuthData.access_token);
    decodedToken.merchant_id.should.eql(bundle.authData.merchant_id.replace("_test", ""))
  });

  it('Has auth details added to every request', async () => {
    const bundle = {
      authData: {
        merchant_id: process.env.MERCHANT_ID,
        secret_key: process.env.SECRET_KEY,
        environment: process.env.ENVIRONMENT
      }
    };

    const newAuthData = await appTester(App.authentication.sessionConfig.perform, bundle);
    bundle.authData.access_token = newAuthData.access_token;

    var response = await appTester(App.authentication.test, bundle);
    
    response.request.headers['Authorization'].should.eql('Bearer ' + newAuthData.access_token);    
    response.status.should.eql(200);
    response.data.environment.toLowerCase().should.eql(bundle.authData.environment.toLowerCase());
  });
});