'use strict';

const { BASE_URL, BASE_AUTH_URL } = require('./constants');

const test = (z, bundle) => z.request({
  url: `${BASE_URL}/${bundle.authData.environment}/health/auth`,
  method: 'GET'
});

const getLabel = (z, bundle) => {
  return `${bundle.inputData.data.merchant} (${bundle.authData.merchant_id}) - ${bundle.inputData.data.email} (${bundle.authData.environment})`;
};

const getAccessToken = async (z, bundle) => { 
  let username = bundle.authData.merchant_id;
  let password = bundle.authData.secret_key;
  let authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  const response = await z.request(`${BASE_AUTH_URL}/connect/token`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader
    },
    form: {
      'grant_type': 'client_credentials',
      'scope': 'api1'
    }
  });

  return {
    access_token: response.data.access_token,
  };
};

module.exports = {
  type: 'session',
  fields: [
    {
      computed: false,
      key: 'merchant_id',
      required: true,
      label: 'Merchant Id',
      type: 'string',
      helpText: 'This can be found in the [Pinch Portal - Integrations](https://app.getpinch.com.au/Integrations) screen (under API Keys).'
    },
    {
      computed: false,
      key: 'secret_key',
      required: true,
      label: 'Secret Key',
      type: 'password',
      helpText: 'This can be found in the [Pinch Portal - Integrations](https://app.getpinch.com.au/Integrations) screen (under API Keys).'
    },
    {
      computed: false,
      key: 'environment',
      required: true,
      type: 'string',
      label: 'Environment',
      default: 'live',
      choices: ['live', 'test'],
      helpText: 'ADVANCED: If you have a developer account, you can use your Test Merchant ID and Test Secret Key, by selecting \'test\' here. See [Test and Live Mode](https://docs.getpinch.com.au/docs/test-and-live-mode) in our documentation for more information.'
    },
  ],
  sessionConfig: { perform: getAccessToken },
  test: test,
  connectionLabel: getLabel
};
