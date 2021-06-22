const { BASE_URL } = require('../constants');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payers/${bundle.inputData.payerId}`,
    method: 'GET',
    headers: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.data;

    // You can do any parsing you need for results here before returning them

    return [results];
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'payerId',
        label: 'PayerId',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'pyr_XXXXXXXXXXXXXX',
      firstName: '',
      lastName: '',
      emailAddress: '',
      mobileNumber: null,
      streetAddress: null,
      suburb: null,
      postcode: null,
      state: null,
      country: null,
      companyName: null,
      companyRegistrationNumber: null,
      metadata: null,
      sources: [
        {
          id: 'src_XXXXXXXXXXXXXX',
          sourceType: 'bank-account',
          bankAccountNumber: '',
          bankAccountBsb: '',
          bankAccountName: '',
          creditCardToken: null,
          cardHolderName: null,
          expiryDate: null,
          displayCardNumber: null,
          cardScheme: null,
          origin: '',
          funding: null,
        },
      ],
      agreements: [
        {
          id: 'agr_XXXXXXXXXXXXXX',
          anonymousViewToken: '',
          agreementDateUtc: '2021-04-25T23:26:41Z',
          confirmedDateUtc: '2021-04-25T23:26:41Z',
          status: '',
        },
      ],
    },
    outputFields: [
      { key: 'id' },
      { key: 'firstName' },
      { key: 'lastName' },
      { key: 'emailAddress' },
      { key: 'mobileNumber' },
      { key: 'streetAddress' },
      { key: 'suburb' },
      { key: 'postcode' },
      { key: 'state' },
      { key: 'country' },
      { key: 'companyName' },
      { key: 'companyRegistrationNumber' },
      { key: 'metadata' },
      { key: 'sources[]id' },
      { key: 'sources[]sourceType' },
      { key: 'sources[]bankAccountNumber' },
      { key: 'sources[]bankAccountBsb' },
      { key: 'sources[]bankAccountName' },
      { key: 'sources[]creditCardToken' },
      { key: 'sources[]cardHolderName' },
      { key: 'sources[]expiryDate' },
      { key: 'sources[]displayCardNumber' },
      { key: 'sources[]cardScheme' },
      { key: 'sources[]origin' },
      { key: 'sources[]funding' },
      { key: 'agreements[]id' },
      { key: 'agreements[]anonymousViewToken' },
      { key: 'agreements[]agreementDateUtc', type: 'datetime' },
      { key: 'agreements[]confirmedDateUtc', type: 'datetime' },
      { key: 'agreements[]status' },
    ],
  },
  key: 'payer_find',
  noun: 'Payer',
  display: {
    label: 'Find Payer',
    description: 'Find a payer by their Payer Id',
    hidden: false,
    important: true,
  },
};
