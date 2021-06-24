'use strict';

const { BASE_URL, BASE_AUTH_URL } = require('./constants');

const test = (z, bundle) => z.request({
  url: `${BASE_URL}/${bundle.authData.environment}/health/auth`,
  method: 'GET'
});

const getLabel = (z, bundle) => {
  return `[${JSON.stringify(bundle.inputData)}] ${bundle.inputData.data.merchant} - ${bundle.inputData.data.email} (${bundle.authData.environment})`;
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
      helpText: 'Go to the [Integrations](https://app.getpinch.com.au/Integrations) screen on Pinch Portal (under API Keys - supports Live mode only) or [API Keys](https://web.getpinch.com.au/api-keys) on the developer portal (both Live and Test mode) to find your Merchant Id.'
    },
    {
      computed: false,
      key: 'secret_key',
      required: true,
      label: 'Secret Key',
      type: 'password',
      helpText: 'Go to the [Integrations](https://app.getpinch.com.au/Integrations) screen on Pinch Portal (under API Keys - supports Live mode only) or [API Keys](https://web.getpinch.com.au/api-keys) on the developer portal (both Live and Test mode) to find your Secret Key.'
    },
    {
      computed: false,
      key: 'environment',
      required: true,
      type: 'string',
      label: 'Environment',
      default: 'test',
      choices: ['test', 'live'],
      helpText: 'In Test mode you can trial Pinch in a fully functional sandboxed environment. When you\'re ready to use this in production and process real transactions, set this to Live. See [Test and Live Mode](https://docs.getpinch.com.au/docs/test-and-live-mode) in our documentation for more information.'
    },
  ],
  sessionConfig: { perform: getAccessToken },
  test: test,
  connectionLabel: getLabel
};
