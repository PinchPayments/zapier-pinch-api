'use strict';
const should = require('should');
const jwt_decode = require('jwt-decode');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Session Auth Tests', () => {
  zapier.tools.env.inject();

  it('Has an exchange for merchant/secret', (done) => {
    const bundle = {
      authData: {
        merchant_id: process.env.MERCHANT_ID,
        secret_key: process.env.SECRET_KEY,
        environment: process.env.ENVIRONMENT
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
      .then((newAuthData) => {
        const decodedToken = jwt_decode(newAuthData.access_token);
        decodedToken.merchant_id.should.eql(bundle.authData.merchant_id.replace("_test", ""))
        done();
      })
      .catch(done);

  });

  it('Has auth details added to every request', (done) => {
    const bundle = {
      authData: {
        merchant_id: process.env.MERCHANT_ID,
        secret_key: process.env.SECRET_KEY,
        environment: process.env.ENVIRONMENT
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
      .then((newAuthData) => {
        bundle.authData.access_token = newAuthData;
        appTester(App.authentication.test, bundle)
          .then((response) => {
            response.status.should.eql(200);
            response.environment.should.eql(bundle.environment);
            done();
          })
          .catch(done);
        done();
      })
      .catch(done);
  });
});